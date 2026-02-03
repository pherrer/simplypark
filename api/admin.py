from django.contrib import admin
from .models import ParkingSpot
# Register your models here.

@admin.register(ParkingSpot)
class ParkingSpotAdmin(admin.ModelAdmin):
    list_display = ("spot_id", "occupied", "updated_at")
    list_filter = ("occupied",)
    search_fields = ("spot_id",)
    ordering = ("spot_id",)


