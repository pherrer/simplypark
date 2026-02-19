# simplypark
Senior Design: SimplyPark Software [WIP]

## basic architecture:
Sensor (ESP32) → Wi-Fi → Backend API (Django + DRF) → SQLite → Frontend (HTML/JS map / kiosk).

## description:
### Software:
this github repo contains the code for the software portion of simplypark. it aims to:
- collect sensor readings
- organize sensor readings
- get them into a backend api
- log the data in mysql
- connect the backend with the frontend website to produce a dynamic, customizeable garage map

### Hardware:
This github repo additionally contains the hardware aspect for the simplypark sensor device. it aims to:
- measure the distance from the ceiling to the ground
- send a signal when the distance is less than that maximum measured distance
- turn a red LED light on to signal a filled parking space
- turn a green LED light on to signal an empty parking space
- send the measured data from the sensor to the sensor reasings collection and backend API

