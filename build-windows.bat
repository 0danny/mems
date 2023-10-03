@echo off
setlocal enabledelayedexpansion

:: Set NDK variables
set NDK_ROOT=C:\Android-SDK\ndk\25.2.9519653
set API_LEVEL=31
set ARCH=x86_64

:: Check if NDK_ROOT exists
if not exist "%NDK_ROOT%" (
    echo Error: NDK_ROOT directory does not exist.
)

:: Export NDK paths
set PATH=%NDK_ROOT%;%PATH%
set SYSROOT=%NDK_ROOT%\toolchains\llvm\prebuilt\windows-x86_64\sysroot\usr\include\
set CXX=%NDK_ROOT%\toolchains\llvm\prebuilt\windows-x86_64\bin\x86_64-linux-android%API_LEVEL%-clang++
set CC=%NDK_ROOT%\toolchains\llvm\prebuilt\windows-x86_64\bin\x86_64-linux-android%API_LEVEL%-clang

:: Check if necessary binaries exist
if not exist "%CXX%" (
    echo Error: C++ compiler binary not found.
)
if not exist "%CC%" (
    echo Error: C compiler binary not found.
)

:: Delete build directory.
if exist "build" (
    rmdir /s /q "build"
)

mkdir build || echo Error: Failed to create build directory.
cd build

:: Invoke CMake and check if it succeeds
cmake -G "Unix Makefiles" -DCMAKE_TOOLCHAIN_FILE=%NDK_ROOT%\build\cmake\android.toolchain.cmake ^
      -DANDROID_ABI=%ARCH% ^
      -DANDROID_NATIVE_API_LEVEL=%API_LEVEL% ^
      -DCMAKE_C_COMPILER=%CC% ^
      -DCMAKE_CXX_COMPILER=%CXX% ^
      .. || echo Error: CMake configuration failed.


:: Build using make and check if it succeeds
make || echo Error: Build failed.

:: Print out completion message
echo Build completed!
