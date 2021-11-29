from django.http.response import JsonResponse
from rest_framework import serializers
from polyclinic.serviceLayer.polyclinicServices import getPolyclinics
from polyclinic.models import Polyclinic

#Сериализация объектов Polyclinic
class PolyclinicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Polyclinic
        fields = ["polyclinicType", "name", "address", "metro", "phone"]

#Получение объектов Polyclinic
def getPolyclinicData(request):
    polyclinics = PolyclinicSerializer(getPolyclinics(), many = True)
    return JsonResponse(polyclinics.data, safe=False)
