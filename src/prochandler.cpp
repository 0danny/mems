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
        std::string name;

        if (file) {
          std::getline(file, name, '\0'); // read until the first '\0'
          file.close();
        }

        // If we didn't get a name from cmdline, try /proc/[pid]/status
        if (name.empty()) {
          std::string status_file = "/proc/" + std::to_string(pid) + "/status";
          std::ifstream statusFile(status_file.c_str());
          if (statusFile) {
            std::string line;
            while (std::getline(statusFile, line)) {
              if (line.rfind("Name:", 0) == 0) { // if line starts with "Name:"
                name = line.substr(6);           // skip "Name:\t"
                break;
              }
            }
            statusFile.close();
          }
        }

        if (name.empty()) {
          name = "Unknown";
        }

        processes.push_back({pid, name});
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