#pragma once

#include "prochandler.h"
#include <mongoose/mongoose.h>
#include <mutex>
#include <nlohmann/json.hpp>
#include <string>

class scanner {
private:
  const char *s_listen_on = "ws://localhost:8000";
  const char *s_web_root = "./build";

  const std::string version = "1.0.0";

  struct mg_mgr mgr; // Event manager

  prochandler procHandler = prochandler();

  std::map<std::string, std::function<void(nlohmann::json, struct mg_connection *c)>> messageHandlers;

  static void eventHandler(struct mg_connection *c, int ev, void *ev_data, void *fn_data);

  void registerHandler(const std::string &messageType, const std::function<void(nlohmann::json, struct mg_connection *c)> &handler);

  void linkHandlers();

public:
  scanner();
  ~scanner();

  void run();
};
