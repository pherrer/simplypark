# Purpose: Serve the garage map HTML page for the /map/ route. It only renders the template and does not supply data.
from django.shortcuts import render

def home(request):
    """Serve the home page"""
    return render(request, "garage_map/home.html")

def index(request):
    return render(request, "garage_map/index.html")

def index_react(request):
    """Serve the React version of the garage map"""
    return render(request, "garage_map/index_react.html")