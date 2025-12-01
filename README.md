# simplypark
Senior Design: SimplyPark Software [WIP]

## basic architecture:
Sensor (ESP32) → Wi-Fi → Backend API (Django + DRF) → SQLite → Frontend (HTML/JS map / kiosk).

## description:

this github repo contains the code for the software portion of simplypark. it aims to:
- collect sensor readings
- organize sensor readings
- get them into a backend api
- log the data in mysql
- connect the backend with the frontend website to produce a dynamic, customizeable garage map
