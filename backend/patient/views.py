import json
from django.contrib.auth.models import User
from rest_framework import serializers
from patient.models import Patient
from django.http.response import HttpResponse, JsonResponse

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name"]

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Patient
        userType = model._meta.model_name
        fields = ["id", "userType", "user", "patronymic", "polis", "birthDate"]

def join(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    Patient.create(jsonData['name'], jsonData['surname'], jsonData['patronymic'], jsonData['birthDate'], jsonData['email'], jsonData['polis'], jsonData['login'], jsonData['password'])
    return JsonResponse({'status':'OK'})

def getPatientData(request):
    patient = PatientSerializer(Patient.objects.get(pk = request.session['userID']))
    return JsonResponse(patient.data)