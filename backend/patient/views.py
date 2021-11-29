import json
from django.contrib.auth.models import User
from rest_framework import serializers
from patient.models import Patient
from patient.serviceLayer.patientServices import patientCreating, getPatientUserID, getPatient
from django.http.response import HttpResponse, JsonResponse

#Сериализация поля user Patient
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name"]

#Сериализация объектов Patient
class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Patient
        fields = ["id", "userType", "user", "patronymic", "polis", "birthDate"]

#Создание объектов Patient
def join(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    patientCreating(jsonData)
    return JsonResponse({'status':'OK'})

#Получение объекта Patient по ID его user
def getPatientData(request):
    if (request.session.get('isLogged', 'false') == 'true'):
        patient = PatientSerializer(getPatientUserID(request.session['userID']))
        return JsonResponse(patient.data)
    else: return HttpResponse({'status':'403'})

#Получение объекта Patient по его ID
def getPatientByID(request):
    patientID = json.loads(request.body.decode("utf-8"))['patientID']
    patient = PatientSerializer(getPatient(patientID))
    return JsonResponse(patient.data)