#include "scanner.h"
#include "logger.h"
#include "prochandler.h"
#include "syshandler.h"
#include <functional>
#include <iostream>
#include <map>
#include <nlohmann/json.hpp>

scanner::scanner() {
  mg_mgr_init(&mgr); // Initialise event manager
  logger::log("Starting WS listener on - ", s_listen_on);
  mg_http_listen(&mgr, s_listen_on, scanner::eventHandler, this); // Create HTTP listener
}

scanner::~scanner() {
  logger::log("Deconstructing scanner.");
  mg_mgr_free(&mgr);
}

void scanner::run() {
  // Register event handlers
  linkHandlers();

  for (;;) {
    mg_mgr_poll(&mgr, 1000); // Infinite event loop
  }
}

void scanner::linkHandlers() {
  registerHandler("processes", [this](nlohmann::json j, mg_connection *c) {
    // Handle the specific message here
    logger::log("Handling message of type {processes} from ", c->id);

    std::vector<prochandler::process> processes = procHandler.getRunningProcesses();

    logger::log("Amount of processes: ", processes.size());

    nlohmann::json message = {
        {"type", "processes"},
        {"data", procHandler.toJsonArray(processes)}};

    std::string serialized_message = message.dump();

    mg_ws_send(c, serialized_message.c_str(), serialized_message.size(), WEBSOCKET_OP_TEXT);
  });

  registerHandler("device-info", [this](nlohmann::json j, mg_connection *c) {
    // Just some place holder stuff until I figure out what I want to put there.

    nlohmann::json message = {
        {"type", "device-info"},
        {"data", {{"deviceName", syshandler::getDeviceName()}, {"user", syshandler::getUser()}}}};

    std::string serialized_message = message.dump();

    mg_ws_send(c, serialized_message.c_str(), serialized_message.size(), WEBSOCKET_OP_TEXT);
  });
}

void scanner::registerHandler(const std::string &messageType, const std::function<void(nlohmann::json, struct mg_connection *c)> &handler) {
  messageHandlers[messageType] = handler;
}

void scanner::eventHandler(struct mg_connection *c, int ev, void *ev_data, void *fn_data) {

  if (ev == MG_EV_OPEN) {
    // c->is_hexdumping = 1;
  } else if (ev == MG_EV_HTTP_MSG) {
    struct mg_http_message *hm = (struct mg_http_message *)ev_data;

    if (mg_http_match_uri(hm, "/websocket")) {
      // Upgrade to websocket.
      mg_ws_upgrade(c, hm, NULL);
    } else {
      // Serve static files
      struct mg_http_serve_opts opts = {.root_dir = ((scanner *)fn_data)->s_web_root};
      mg_http_serve_dir(c, hm, &opts);
    }
  } else if (ev == MG_EV_WS_MSG) {
    // Got websocket frame.
    /* Websocket JSON frame looks like:
      {"type"}
    */
    struct mg_ws_message *wm = (struct mg_ws_message *)ev_data;

    std::string messageData(wm->data.ptr, wm->data.len); // Convert to string using length

    scanner *scanRef = ((scanner *)fn_data);

    try {
      nlohmann::json j = nlohmann::json::parse(messageData);

      if (j.contains("type")) {
        std::string type = j["type"];

        // Handle the type value as needed.

        // Route message to handler.
        if (scanRef->messageHandlers.count(type)) {
          scanRef->messageHandlers[type](j, c);
        }
      }
    } catch (const std::exception &e) {
      logger::log("Error parsing JSON: ", e.what());
    }
  }
  (void)fn_data;
}

int main(void) {
  scanner server;

  server.run();

  return 0;
}