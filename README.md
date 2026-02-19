# SimplyPark
### Senior Design: SimplyPark Software [WIP]
Members: Yuning Cao, Melody Cheung, Tejal Dhiman, Paula Herrera, Zihan Sun

## Basic Architecture
Sensor (ESP32) → Wi-Fi → Backend API (Django + DRF) → SQLite → Frontend (HTML/JS map / kiosk).

## Software and Hardware
<ins>Software</ins>
This github repo contains the code for the software portion of simplypark. It aims to:
- Collect sensor readings
- Organize sensor readings
- Get them into a backend api
- Log the data in mysql
- Connect the backend with the frontend website to produce a dynamic, customizeable garage map

<ins>Hardware</ins>
This github repo additionally contains the hardware aspect for the simplypark sensor device. It aims to:
- Measure the distance from the ceiling to the ground
- Send a signal when the distance is less than that maximum measured distance
- Turn a red LED light on to signal a filled parking space
- Turn a green LED light on to signal an empty parking space
- Send the measured data from the sensor to the sensor reasings collection and backend API

