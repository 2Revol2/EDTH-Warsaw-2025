# Angel

Multi purpose project informing and protecting you from the enemies.

## Hardware and purpose

1. angel device {num} (`R. Pi 5` + `R. Pi AI HAT+` + 2 x `Raspberry Pi Camera Module 3 NoIR` + optional cellular hat) Early detection system of the enemy (FPV drones detection as a default vision model):

- R. Pi AI HAT+ pre-trained models for high-performance deep learning applications: [https://github.com/hailo-ai/hailo_model_zoo]
- (R. Pi AI HAT+ Examples) [https://github.com/hailo-ai/hailo-rpi5-examples/blob/main/doc/basic-pipelines.md#detection-example ]

1.1 Communication via network (R Pi provides API):
Raspberry pi provides API to all of the components allowing external communication and control via server or via mobile app (WiFI + Cellular).

The raspberry is also partially autonomous (by default, but depends on the modes)
[assumption that something was detected]
- send information about enemy/drone detected and its distance (`json` packets)
- send information about detected location (GPS of connected internet~approximation) 
- send information about activated weapon against enemy
and more...

If connected to the authenticated server/localhost app it can do above and respond to:
- got requests for cameras feed and controls 
- got requests for all other information - name of the unit/device, location, timestamp, logs etc.
and more...

2. (`Arduno UNO` +  Lidar `TF Luna` + 2 Servos/moters): 

Connected to the Raspberry Pi via USB/UART port.

3. Server 

Able to connect to the authorized and authenticated angel devices.
Have database with all of the data from all of the auth angel devices.
Provides all necessary backend for the webUI and angel devices.
Provides alerts - which angel device detected enemy, allows to connect to it and get camera feed (and admin can get manual control over it)

4. webUI


