#pragma once

#include <nlohmann/json.hpp>
#include <string>

class memhandler {

private:
public:
  struct memoryRegion {
    uintptr_t start;
    uintptr_t end;
    bool readable;
    bool executable;
    bool writable;
  };

  struct memoryResult {
    uintptr_t address;
    int value;
  };

  memhandler();

  std::vector<memoryRegion> getMemoryRegions(pid_t pid);

  std::vector<memoryResult> searchMemory(pid_t pid, int value);
};

inline void to_json(nlohmann::json &j, const memhandler::memoryResult &r) {
  j = nlohmann::json{{"address", r.address}, {"value", r.value}};
}