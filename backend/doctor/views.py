import json
from django.contrib.auth.models import User
from django.http.response import JsonResponse
from rest_framework import serializers
from doctor.models import Doctor

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name"]

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Doctor
        fields = ["id", "userType", "user", "patronymic", "speciality", "birthDate"]

def getDoctorData(request):
    doctor = DoctorSerializer(Doctor.objects.get(pk = request.session['userID']))
    return JsonResponse(doctor.data)