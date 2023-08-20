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

std::vector<prochandler::process> prochandler::getRunningProcesses()
{
  std::vector<process> processes;

  DIR *dir = opendir("/proc");
  if (dir) {
    struct dirent *entry;
    while ((entry = readdir(dir)) != NULL) {
      int pid = atoi(entry->d_name);
      if (pid > 0) {
        std::string cmdline_file = "/proc/" + std::to_string(pid) + "/cmdline";

        std::ifstream file(cmdline_file.c_str());
        if (file) {
          std::string name;
          std::getline(file, name);
          if (name == "") {
            name = "Unknown";
          }
          processes.push_back({pid, name});
        }
      }
    }
    closedir(dir);
  }

  return processes;
}

nlohmann::json prochandler::toJsonArray(const std::vector<prochandler::process> &processes)
{
  nlohmann::json j = nlohmann::json::array();
  for (const auto &process : processes) {
    nlohmann::json jObject = process.to_json();

    j.push_back(jObject);
  }
  return j;
}