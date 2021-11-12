import json
from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Patient

def join(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    print("DATA SEND: " + jsonData['birthDate'])
    Patient.create(jsonData['name'], jsonData['surname'], jsonData['patronymic'], jsonData['birthDate'], jsonData['email'], jsonData['polis'], jsonData['login'], jsonData['password'])
    return JsonResponse({'status':'OK'})

def login():
    pass