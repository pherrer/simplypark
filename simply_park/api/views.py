from django.shortcuts import render
from django.http import JsonResponse

#handles all the major requests coming into django - pauli
#esp devices communicate w/ text (JSON) - pauli
def home(request):
    response = {
        "message": "SimplyParks Backend WIP"
    } 
    return JsonResponse(response)


