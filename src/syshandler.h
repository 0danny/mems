#pragma once

#include <nlohmann/json.hpp>
#include <string>

class syshandler {

public:
  static std::string getDeviceName();
  static std::string getUser();
};
