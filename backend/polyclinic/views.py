from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import serializers

from polyclinic.models import Polyclinic

class PolyclinicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Polyclinic
        fields = ["polyclinicType", "name", "address", "metro", "phone"]

def getPolyclinicData(request):
    polyclinics = PolyclinicSerializer(Polyclinic.objects.all(), many = True)
    return JsonResponse(polyclinics.data, safe=False)
