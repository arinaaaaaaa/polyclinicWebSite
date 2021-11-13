import json
from django.http.response import HttpResponse, JsonResponse
from django.contrib.auth import authenticate
from django.shortcuts import render
from .models import Patient

def join(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    Patient.create(jsonData['name'], jsonData['surname'], jsonData['patronymic'], jsonData['birthDate'], jsonData['email'], jsonData['polis'], jsonData['login'], jsonData['password'])
    return JsonResponse({'status':'OK'})