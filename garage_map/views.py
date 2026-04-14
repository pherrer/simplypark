# Purpose: Serve the garage map HTML page for the /map/ route. It only renders the template and does not supply data.
from django.shortcuts import render
from django.http import JsonResponse
import json

SPOTS = {}

def update_spot(request):
    if request.method == "POST":
        data = json.loads(request.body)

        spot_id = data["spot_id"]
        occupied = data["occupied"]

        SPOTS[spot_id] = "occupied" if occupied else "available"

        return JsonResponse({"status": "ok"})


def get_spots(request):
    spots = [
        {"id": str(k), "status": v}
        for k, v in SPOTS.items()
    ]

    return JsonResponse({
        "level_id": "L1",
        "spots": spots
    })

def index(request):
    return render(request, "garage_map/index.html")