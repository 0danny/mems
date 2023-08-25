# Mems

Mems is an android based memory scanner & editor that is operated from a locally hosted web page.

## Current Progress

Mems is in very early stages, this is what the frontend currently looks like:
<img width="1721" alt="image" src="https://github.com/0danny/mems/assets/14921414/bfaed99c-14ac-4958-97fb-dba3e172175f">

In terms of functionality it is able to pull a process list off the device as well as some other information.

Memory scanning functionality is available on the server end for scanning all regions for integer types, however it has not been implemented on the frontend yet.


## AVD Notes

adb forward tcp:8000 tcp:8000

To open port 8000 for the web server to interact with the host machine.
