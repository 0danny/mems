#!/bin/bash

# Cross compiling is SO FUN!

# Ensure script exits on any error
set -e

# Function to print error message and exit
function error_exit {
    echo "$1" 1>&2
    exit 1
}

# Set NDK variables
NDK_ROOT=~/Library/Android/sdk/ndk/25.1.8937393
API_LEVEL=27
ARCH=arm64-v8a

# Check if NDK_ROOT exists
[ -d "$NDK_ROOT" ] || error_exit "Error: NDK_ROOT directory does not exist."

# Export NDK paths
export PATH=$NDK_ROOT:$PATH
export SYSROOT=$NDK_ROOT/toolchains/llvm/prebuilt/darwin-x86_64/sysroot/usr/include/
export CXX=$NDK_ROOT/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android$API_LEVEL-clang++
export CC=$NDK_ROOT/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android$API_LEVEL-clang

# Check if necessary binaries exist
[ -f "$CXX" ] || error_exit "Error: C++ compiler binary not found."
[ -f "$CC" ] || error_exit "Error: C compiler binary not found."

# Create build directory
#rm -rf build
mkdir -p build || error_exit "Error: Failed to create build directory."
cd build

# Invoke CMake and check if it succeeds
cmake -DCMAKE_TOOLCHAIN_FILE=$NDK_ROOT/build/cmake/android.toolchain.cmake \
      -DANDROID_ABI=$ARCH \
      -DANDROID_NATIVE_API_LEVEL=$API_LEVEL \
      .. || error_exit "Error: CMake configuration failed."

# Build using make and check if it succeeds
make || error_exit "Error: Build failed."

# Print out completion message
echo "Build completed!"
