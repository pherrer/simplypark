from django.urls import path
from .views import get_spots, update_spot

urlpatterns = [
    path("spots/", get_spots), #wiring the url on app level
    path("update_spot/", update_spot)
]