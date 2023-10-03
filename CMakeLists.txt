cmake_minimum_required(VERSION 3.22.1)

project(mems)

include_directories(${CMAKE_HOME_DIRECTORY}/src/includes/)

# List of source files
set(SOURCES 
    src/scanner.cpp
    src/memhandler.cpp
    src/prochandler.cpp
    src/syshandler.cpp
    ${CMAKE_HOME_DIRECTORY}/src/includes/mongoose/mongoose.c
)

# Create the executable
add_executable(scanner ${SOURCES})

# If you need to link against NDK libraries, you can do it here. 
# For instance, if you're using the android or log libraries:
target_link_libraries(scanner log android)

# Set C++ standard
set_target_properties(scanner PROPERTIES CXX_STANDARD 11)

get_target_property(SCANNER_INCLUDES scanner INCLUDE_DIRECTORIES)
message("Scanner includes: ${SCANNER_INCLUDES}")