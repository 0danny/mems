#pragma once

#include <nlohmann/json.hpp>
#include <string>

class memory {

private:
  // Add other private members as necessary.

public:
  struct memoryRegion {
    uintptr_t start;
    uintptr_t end;
    bool readable; // To store whether the region is readable
  };

  memory(); // default buffer size is set to 1024 bytes

  std::vector<memoryRegion> getMemoryRegions(pid_t pid);

  void searchMemory(pid_t pid, int value);
};
