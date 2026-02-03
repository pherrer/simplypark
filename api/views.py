from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ParkingSpot
from .serializers import ParkingSpotSerializer

#handles all the major requests coming into django - pauli
#esp devices communicate w/ text (JSON) - pauli
def home(request):
    response = {
        "message": "SimplyParks Backend WIP"
    } 
    return JsonResponse(response)

#this is the GET endpoint, where we READ DATA
@api_view(["GET"])
def get_spots(request):
    spots = ParkingSpot.objects.all().order_by("spot_id")
    serializer = ParkingSpotSerializer(spots, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def update_spot(request):
    spot_id = request.data.get("spot_id")
    occupied = request.data.get("occupied")

    if spot_id is None or occupied is None:
        return Response(
            {"error: spot_id and occupied are required"},
            status = status.HTTP_400_BAD_REQUEST
        )
    spot , created = ParkingSpot.objects.get_or_create(spot_id = spot_id)
    spot.occupied = bool(occupied)
    spot.save()

    return Response(
        {
            "status": "ok",
            "spot_id": spot.spot_id,
            "occupied" : spot.occupied,
            "created" : created
        },
        status = status.HTTP_200_OK
    )


