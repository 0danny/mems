#pragma once

#include <nlohmann/json.hpp>
#include <string>

class prochandler {

public:
  class process {

  public:
    int id;
    std::string name;

    nlohmann::json toJson() const {
      return {
          {"id", id},
          {"name", name.c_str()}};
    }

    bool hasName() {
      return !name.empty();
    }
  };

  std::vector<process> getRunningProcesses();

  nlohmann::json toJsonArray(const std::vector<process> &processes);

  process fetchProcessInfo(std::string identifier, const int pid);

};
