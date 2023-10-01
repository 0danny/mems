#!/bin/bash

# Function to cleanup and exit emulator
cleanup() {
    echo "[Cleanup] Cleaning up and exiting emulator..."
    adb emu kill
    exit
}

# Set trap to EXIT sig and call the cleanup function
trap cleanup EXIT

build_mems()
{
    # Build the mems.
    ./build.sh

    echo "[CMake] mems cpp source has been built."
}

build_frontend()
{
    cd frontend

    npm run build

    cd ..

    echo "[React] Frontend built."
}

move_files()
{
    # Go into the build folder.
    cd build

    # Create the mems directory on the emulator.
    adb shell "mkdir -p /data/local/tmp/mems"

    # Push the scanner executable and the /build folder to the mems directory on the emulator.
    adb push ./scanner /data/local/tmp/mems/
    adb push ../frontend/build /data/local/tmp/mems/

    echo "[ADB] Files pushed into AVD."
}

prep_emulator()
{
    # Boot up the emulator
    emulator -avd Pixel -no-audio -gpu host -writable-system -no-snapshot-load -dns-server 8.8.8.8 &> /dev/null &

    # Wait till it is booted up.
    adb wait-for-device

    # Open webserver and socket ports up.
    adb forward tcp:8000 tcp:8000

    move_files

    # Navigate to /data/local/tmp/mems, make the scanner executable, and then run it.
    # If you want to keep the adb shell session open after the scanner runs, you can do:
    echo "cd /data/local/tmp/mems && chmod +x scanner && ./scanner"

    echo "[ADB] Emulator booting up, running adb shell."

    adb shell
}

build_mems
build_frontend
prep_emulator



