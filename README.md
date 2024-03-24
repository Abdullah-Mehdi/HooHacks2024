# HooHacks2024
Fall Detection Software with Front-end

The Backend uses `Python` version 3.11.x with `OpenCV`, `MediaPipe`, `Numby`, and `Twilio`

The Frontend uses `ReactJS` and `JavaScript` 

The connection between the two is done via `Flask`

# Backend

The main functionality is with `OpenCV`, `MediaPipe`, `Numby`.
Using the users' camera as input the program determines if it has detected a fall, and will continue to take live input until exited with either 'q' or a fall detection.

If the user falls a message is displayed to notify that a fall was detected, the frame in which it was detected is captured, and a phone call is placed to the number on file via `Twilio`.

# Frontend

The frontend launches a webpage on the localhost domain on port 3000

This page contains a blue/pink bg with a stock doctor-patient image, a login and signup button combo on the right side, a logo on the left side, and two pages:

- "About Us" - Detailing some more information about us the team 

- "Fall Detection" - Where the backend program mentioned prior is launched and incorporated
