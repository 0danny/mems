#include <chrono>
#include <ctime>
#include <iomanip>
#include <iostream>
#include <sstream>

class logger {
public:
#define log(...) logger::_log(__func__, __VA_ARGS__)

  template <typename... Args>
  static void _log(const char *functionName, Args... args)
  {
    std::cout << "[" << getCurrentTime() << "][" << functionName << "]: ";
    print(args...);
    std::cout << std::endl;
  }

private:
  static std::string getCurrentTime()
  {
    auto now = std::chrono::system_clock::now();
    auto in_time_t = std::chrono::system_clock::to_time_t(now);

    std::stringstream ss;
    ss << std::put_time(std::localtime(&in_time_t), "%X");
    return ss.str();
  }

  template <typename First, typename... Rest>
  static void print(First first, Rest... rest)
  {
    std::cout << first;
    print(rest...);
  }

  static void print() {}
};
