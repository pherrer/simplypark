# Purpose: Define URL routes for the garage_map app. It connects the root of /map/ to the index view.
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="garage_map"),
]
