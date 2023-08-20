#!/bin/bash

# Function to cleanup and exit emulator
cleanup() {
    echo "Cleaning up and exiting emulator..."
    adb emu kill
    exit
}

# Set trap to EXIT sig and call the cleanup function
trap cleanup EXIT

# Build the mem scanner.
./build.sh

# Go into the build folder.
cd build

# Boot up the emulator
emulator -avd testdevice -gpu host -writable-system -no-snapshot-load -dns-server 8.8.8.8 &> /dev/null &

# Wait till it is booted up.
adb wait-for-device

# Open webserver and socket ports up.
adb forward tcp:8000 tcp:8000

# Create the mem-scanner directory on the emulator.
adb shell "mkdir -p /data/local/tmp/mem-scanner"

# Push the scanner executable and the /public folder to the mem-scanner directory on the emulator.
adb push ./scanner /data/local/tmp/mem-scanner/
adb push public /data/local/tmp/mem-scanner/

echo "Running the ADB shell script."

# Navigate to /data/local/tmp/mem-scanner, make the scanner executable, and then run it.
# If you want to keep the adb shell session open after the scanner runs, you can do:
echo "cd /data/local/tmp/mem-scanner && chmod +x scanner && ./scanner"

adb shell
