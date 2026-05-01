# Purpose: Define database models for parking spots. It describes stored fields and behaviors.
from django.db import models

# Create your models here.

#defn: models r the source of ur data.
#      they contain the fields and behaviors of the data ur storing
#      each model maps to a single database table :3
#      each attribute of a model represents a database field

#1/20
# add a parking spot model, then apply migrations
# then do the DRF serializer

class ParkingSpot(models.Model):
    STATUS_CHOICES = [
        ("available", "Available"),
        ("occupied", "Occupied"),
        ("unknown", "Unknown"),
    ]

    spot_id = models.IntegerField(unique=True)
    status = models.CharField(
        max_length=10, 
        choices=STATUS_CHOICES, 
        default="unknown"
    )
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Spot {self.spot_id} - {self.status}"