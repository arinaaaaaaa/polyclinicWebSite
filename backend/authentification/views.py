import json
from django.contrib.auth.models import User
from rest_framework import serializers
from patient.models import Patient
from django.http.response import HttpResponse, JsonResponse
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name"]

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Patient
        fields = ["user", "patronymic", "polis", "birthDate"]

def login(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    user = authenticate(username = jsonData['login'], password = jsonData['password'])
    if user is not None:
        serializedUser = PatientSerializer(user.patient)
        return JsonResponse(serializedUser.data)

    elif user is None:
        return HttpResponse({'status':'ERROR'})
