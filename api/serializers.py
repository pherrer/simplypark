# Purpose: Define DRF serializers for ParkingSpot. It converts model objects to and from JSON.
from rest_framework import serializers
from .models import ParkingSpot

#serializers allow data to be rendered to JSON

class ParkingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpot
        fields = ["spot_id", "occupied", "updated_at"]