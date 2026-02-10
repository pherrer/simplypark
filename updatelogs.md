# update logs for software work!!

## 2/3/2026:
- made database w/ python django

## 2/5/2025

to do : build out HTML template (map part of the website. doesn't need to be accurate at this point. maybe make just 3 spots.) 

this HTML part will then be added into the django backend part. 

youtube links: https://www.youtube.com/watch?v=1Ve3KB2Jxgg
j look up django and html and similar stuff

another youtube link : https://www.youtube.com/watch?v=tG0F9ccr-4E

for alpha prototype, youtube link for how to make a basic grid on html: https://www.kirupa.com/css/creating_3x3_grid.htm

we can also use this for the alpha prototype, this is a simpler html: https://www.w3schools.com/css/css_grid.asp

how to put an html website online: https://www.youtube.com/watch?v=p1QU3kLFPdg

what we need to do
- frontend html page ; connected to the parking spots state changes
- make basic html grid (doesnt need to be accurate to babbio garage yet, this is alpha prototype)
- tie the backend state changes to the frontend visual updates (to test we can push updates manually on the backend, no hardware needed yet)
- when hardware is testable, tie the backend to the arduino code (research how to do this, direct collab w/ hardware for this)

## 2/9/2026

decided to use ngrok to workaround ports being blocked
- created temp public url and forwards traffic to localhost : 8000
- so the esp32 and the frontend stuff can access the backend w/o touching the firewall

what this does
- rn we have one backend server (django) w/ two endpoints (GET/api/spots => frontend and POST/api/update_spot =>hardware)
- firewall blocks inbound connections so outside devices cant reach my laotop
- ngrok creates a public url that forwards to my local django server
- basically the same backend and same endpoints but a diff address
- ngrok gives the backend a public door. sensors write data thru the door and the frontend reads that data thru the door


who uses this url
- hardware team - they send sensor updates to **POST https://[ngrok.io url]/api/update_spot/** which allows the ESP32 to reach the backend over the interwebz
- frontend - get occupancy data from **GET https://[ngrok.io url]/api/spots/** so the website can load data no matter where it's hosted

**BIG IMPORTANT NOTE: the ngrok url changes each time i restart it. i'll send the new url before demos so we can paste it in**

what to do for runtime:
1) run django normally (python manage.py runserver)
2) in a second terninal, run ngrok (ngrok http 8000)
3) copy the **forwarding https://[urlhere.ngrok.io] -> http://localhost:8000** URL
4) frontend and backend replace http://127.0.0.1:8000 with https://[urlhere.ngrok.io] instead. NOTE THAT EVERYTHING AFTER /api/... REMAINS THE SAME!!!!

---------------------------------------------
soooo.... **what's been done so far??????**
- django backend is running locally and exposed via REST
- i got an sql lite database and migrations
- parkingspot model has been done (basically the variable)
- the REST api is working (GET /spots/ and POST/update_spot/)
- the admin interface is chilling
- the ngrok tunnel system is working, there are public URLS available for hardware POST and frontend GET

---------------------------------------------

ref image for the front end website:

<img width="1024" height="436" alt="image" src="https://github.com/user-attachments/assets/89aaf31a-1f48-403c-a9f2-6c524ec6e758" />

[credit: parking structures design from transform transport](https://transformtransport.org/media/articles/parking-structures-design/)

