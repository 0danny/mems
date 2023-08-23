#include "prochandler.h"
#include <cstdlib>
#include <cstring>
#include <dirent.h>
#include <fcntl.h>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>

// TODO: Comment this whole func out and make it cleaner.
// They do NOT make this shit easy at all
std::vector<prochandler::process> prochandler::getRunningProcesses() {
  std::vector<process> processes;

  DIR *dir = opendir("/proc");
  if (dir) {
    struct dirent *entry;
    while ((entry = readdir(dir)) != NULL) {
      int pid = atoi(entry->d_name);
      if (pid > 0) {

        process fetchCmd = fetchProcessInfo("cmdline", pid);

        processes.push_back(fetchCmd.hasName() ? fetchCmd : fetchProcessInfo("status", pid));
      }
    }
    closedir(dir);
  }

  return processes;
}

// If cmdline doesn't work, we attempt to use /proc/<pid>/status.
prochandler::process prochandler::fetchProcessInfo(std::string identifier, const int pid) {
  std::string infoFilePath = "/proc/" + std::to_string(pid) + "/" + identifier;
  std::ifstream infoFile(infoFilePath.c_str());
  std::string name = "";

  if (infoFile) {
    if (identifier == "cmdline") {
      std::getline(infoFile, name, '\0');

    } else if (identifier == "status") {
      std::string line;
      while (std::getline(infoFile, line)) {
        if (line.rfind("Name:", 0) == 0) {
          name = line.substr(6);
          break;
        }
      }
    }
  }

  infoFile.close();

  return {pid, name};
}

nlohmann::json prochandler::toJsonArray(const std::vector<prochandler::process> &processes) {
  nlohmann::json j = nlohmann::json::array();
  for (const auto &process : processes) {
    nlohmann::json jObject = process.toJson();

    j.push_back(jObject);
  }
  return j;
}