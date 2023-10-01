@echo off
setlocal

REM Build mems
call ./build-windows.bat
echo [CMake] mems cpp source has been built.

REM Build frontend
cd frontend
call npm run build
echo Finished
cd ..
echo [React] Frontend built.

REM Prepare emulator
start emulator -avd Pixel -no-audio -gpu host -writable-system -no-snapshot-load -dns-server 8.8.8.8
adb wait-for-device
adb forward tcp:8000 tcp:8000

REM Move files to emulator
cd build
adb shell "mkdir -p /data/local/tmp/mems"
adb push ./scanner /data/local/tmp/mems/
adb push ../frontend/build /data/local/tmp/mems/
echo [ADB] Files pushed into AVD.

echo "cd /data/local/tmp/mems && chmod +x scanner && ./scanner"
echo [ADB] Emulator booting up, running adb shell.
adb shell

REM Function to cleanup and exit emulator
echo [Cleanup] Cleaning up and exiting emulator...
exit /b