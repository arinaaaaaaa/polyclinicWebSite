import json
from rest_framework import serializers
from patient.models import Patient
from doctor.models import Doctor
from django.http.response import HttpResponse, JsonResponse
from django.contrib.auth import authenticate

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ["id", "userType"]

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["id", "userType"]

def login(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    isLogged = request.session.get('isLogged', 'false')
    if (isLogged == 'true'):
        return JsonResponse({'userType': request.session.get('userType')})
    elif (isLogged == 'false'):
        try:
            user = authenticate(username = jsonData['login'], password = jsonData['password'])
        except KeyError:
            user = None
        if user is not None:
            try:
                request.session['userID'] = PatientSerializer(user.patient).data['id']
                request.session['userType'] = PatientSerializer(user.patient).data['userType']
                request.session['isLogged'] = 'true'
                request.session.modified = True
                return JsonResponse({'userType': request.session.get('userType')})
            except:
                request.session['userID'] = DoctorSerializer(user.doctor).data['id']
                request.session['userType'] = DoctorSerializer(user.doctor).data['userType']
                request.session['isLogged'] = 'true'
                request.session.modified = True
                return JsonResponse({'userType': request.session.get('userType')})
        elif user is None:
            return HttpResponse({'status':'401'})

def logout(request):
    request.session['isLogged'] = 'false'
    return HttpResponse({'status':'200'})