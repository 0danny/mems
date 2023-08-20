#pragma once

#include <nlohmann/json.hpp>
#include <string>

class prochandler {

private:
  // Add other private members as necessary.

public:
  class process {
  public:
    int id;
    std::string name;
    // Other members...

    // Convert Process to JSON representation
    nlohmann::json to_json() const
    {
      return {
          {"id", id},
          {"name", name.c_str()}
          // Other members...
      };
    }
  };

  std::vector<process> getRunningProcesses();

  nlohmann::json toJsonArray(const std::vector<process> &processes);
};
