# Mems

Mems is an android based memory scanner & editor that is operated from a locally hosted web page.

## Current Progress

Mems is in very early stages, this is what the frontend currently looks like:
<img width="1721" alt="image" src="https://github.com/0danny/mems/assets/14921414/bfaed99c-14ac-4958-97fb-dba3e172175f">

In terms of functionality it is able to pull a process list off the device as well as some other information.

Memory scanning functionality is available on the server end for scanning all regions for integer types, however it has not been implemented on the frontend yet.

## Architecture/Plan

This application runs on Android devices, if you have super user access and can copy the server files onto a device. Then all thats left is to navgiate to port 8000 on the devices IP address.

**Server**
- Written in C++ cross compiled using the Android NDK.
- Uses mongoose to host a web server and websocket on port 8000.
- Using nlohmann::json for json parsing/serializing.
- Allows for full control over the device and can communicate with the frontend.

**Frontend**
- Written in React JS using Bootstrap 5.3 as a framework.
- Is hosted using mongoose.
- Can connect to the servers websocket via /websocket endpoint.
- Server executes commands for the frontend and sends back information to display.

Due to not owning an Android device the server has only **so far** been tested using an Android S Google Play emulator image running on arm64-v8a.
If using an emulator aswell see "AVD Notes" below, in order to access the web server hosted by the device, 8000 via TCP will need to be open.

Eventually it will build for all targets x86-64 etc. But while main functionality is still being written, it will be developed/tested using the above.

## Building

If for some reason you want to build the project, there is no stream lined way at the moment, but the steps are listed below:

### Modifications
1. You will need to modify the build.sh in the root directory with paths to the NDK on your system.
2. You're welcome to change the API level and ARCH to suit your device.
3. Run **npm install** in the **frontend** directory to install react and other packages.

### Building & Executing
1. Run ./build.sh to build the server executable. Output will be in the root ./build folder. Executable is called **scanner**
2. Build the frontend via **npm run build** while being cd'd in the **frontend** directory. Output will be in the frontend/build folder.
3. Boot your emulator or device attach to it via ADB. **(If on emulator run "adb forward tcp:8000 tcp:8000" to open port 8000)**
4. Navigate to any folder on the device through ADB and created a folder named "mems".
5. Push the scanner executable and entire **build** folder from within **frontend**, into the **mems** folder we just created.
6. Give the scanner permissions to be executable **"chmod +x scanner"**.
7. Run mems **"./scanner"**
8. If all goes well, mems should be accessible via **"http://\<your device ip>:8000"** or using the emulator **"http://localhost:8000"**.

This entire process is executed by my **buildem.sh** script the root directory. You can try it for yourself, however it may need some modifications if you aren't using an emulator.

**Note**: This process will be simplified in the future.

## AVD Notes

adb forward tcp:8000 tcp:8000

To open port 8000 for the web server to interact with the host machine.
