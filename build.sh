#!/bin/bash

# Cross compiling is SO FUN!

# Set NDK variables
NDK_ROOT=~/Library/Android/sdk/ndk/25.1.8937393
API_LEVEL=27
ARCH=arm64-v8a

# Export NDK paths
export PATH=$NDK_ROOT:$PATH
export SYSROOT=$NDK_ROOT/toolchains/llvm/prebuilt/darwin-x86_64/sysroot/usr/include/
export CXX=$NDK_ROOT/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android$API_LEVEL-clang++
export CC=$NDK_ROOT/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android$API_LEVEL-clang

# Create build directory
rm -rf build
mkdir -p build && cd build

# Invoke CMake and build
cmake -DCMAKE_TOOLCHAIN_FILE=$NDK_ROOT/build/cmake/android.toolchain.cmake \
      -DANDROID_ABI=$ARCH \
      -DANDROID_NATIVE_API_LEVEL=$API_LEVEL \
      ..
make

# Right now the /public folder is just getting copied in.
cp -r ../public ./

# Print out completion message
echo "Build completed!"
