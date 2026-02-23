# Purpose: Serve the garage map HTML page for the /map/ route. It only renders the template and does not supply data.
from django.shortcuts import render

def index(request):
    return render(request, "garage_map/index.html")