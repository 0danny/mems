#include "memory.h"
#include "logger.h"
#include <cstdlib>
#include <cstring>
#include <dirent.h>
#include <fcntl.h>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <sys/ptrace.h>
#include <sys/wait.h>
#include <unistd.h> // For pread
#include <vector>

std::vector<memory::memoryRegion> memory::getMemoryRegions(pid_t pid)
{
  std::vector<memoryRegion> regions;

  std::stringstream ss;
  ss << "/proc/" << pid << "/maps";

  std::ifstream maps(ss.str().c_str());
  std::string line;
  while (std::getline(maps, line)) {
    memoryRegion region;
    char perms[5]; // Permissions string: rwxp
    sscanf(line.c_str(), "%lx-%lx %4s", &region.start, &region.end, perms);
    region.readable = perms[0] == 'r'; // Check if the region is readable
    if (region.readable) {             // Only add readable regions
      regions.push_back(region);
    }
  }

  return regions;
}

void memory::searchMemory(pid_t pid, int value)
{
  std::vector<memoryRegion> regions = getMemoryRegions(pid);

  std::stringstream memPath;
  memPath << "/proc/" << pid << "/mem";
  int memFd = open(memPath.str().c_str(), O_RDONLY);

  if (memFd == -1) {
    logger::log("Failed to open memory of process ", pid);
    return;
  }

  ptrace(PTRACE_ATTACH, pid, NULL, NULL);
  wait(nullptr);

  int regionCount = 0;

  logger::log("----- Reading RAM -----");

  for (const auto &region : regions) {
    regionCount++;

    logger::log("Reading region ", regionCount, "/", regions.size());

    size_t regionSize = region.end - region.start;
    char *buffer = new char[regionSize]; // allocate memory to hold the entire region

    ssize_t bytesRead = pread(memFd, buffer, regionSize, region.start);
    if (bytesRead <= 0) {
      delete[] buffer;
      continue; // skip to next region if read failed or got nothing
    }

    logger::log("Read region ", regionCount, ", size of ", bytesRead, ", searching locally.");

    for (size_t i = 0; i < bytesRead - sizeof(int); i += sizeof(int)) {
      int data;
      std::memcpy(&data, buffer + i, sizeof(int));

      if (data == value) {
        uintptr_t foundAddress = region.start + i;

        // logger::log("Found value at address - ", foundAddress);
      }
    }

    delete[] buffer; // free the memory for the current region
  }

  close(memFd);
  ptrace(PTRACE_DETACH, pid, NULL, NULL);
}

/*
int main(int argc, char* argv[]) {
    if (argc != 3) {
        std::cout << "Usage: scanner <pid> <value>" << std::endl;
        return -1;
    }

    pid_t pid = std::atoi(argv[1]);
    int value = std::atoi(argv[2]);

    searchMemory(pid, value);

    return 0;
}*/