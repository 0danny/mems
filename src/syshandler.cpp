#include "syshandler.h"
#include <fstream>
#include <iostream>
#include <pwd.h>
#include <string>
#include <sys/system_properties.h>
#include <unistd.h>

std::string syshandler::getDeviceName() {
  char device_name[PROP_VALUE_MAX];
  __system_property_get("ro.product.model", device_name);
  return std::string(device_name);
}

std::string syshandler::getUser() {
  // Read the UID
  uid_t uid;
  std::ifstream("/proc/self/loginuid") >> uid;

  // Try to resolve the UID to a username
  struct passwd *pw = getpwuid(uid);
  if (pw) {
    return pw->pw_name;
  } else {
    // Fallback: return the UID as a string if username can't be resolved
    return std::to_string(uid);
  }
}