import json
from doctor.serviceLayer.doctorServices import getDates, getDoctor, getDoctorDataUserID, getTimeByID, getDoctorsList, getDoctorTime, getTimeFree
from django.contrib.auth.models import User
from django.http.response import JsonResponse
from rest_framework import serializers
from polyclinic.views import PolyclinicSerializer
from doctor.models import Time, Doctor

#Сериализация объекта user Doctor
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name"]

#Сериализация Doctor
class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    polyclinic = PolyclinicSerializer()
    class Meta:
        model = Doctor
        fields = ["id", "userType", "user", "patronymic", "speciality", "birthDate", "polyclinic", "room"]

#Сериализация поля time Doctor
class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ["id", "currentTime"]

#Получение объекта Doctor по ID его user-a
def getDoctorData(request):
    doctor = DoctorSerializer(getDoctorDataUserID(request.session['userID']))
    return JsonResponse(doctor.data)

#Получение объекта Doctor по его ID
def getDoctorByID(request):
    doctorID = json.loads(request.body.decode("utf-8"))['doctorID']
    doctor = DoctorSerializer(getDoctor(doctorID))
    return JsonResponse(doctor.data)

#Получение объекта Time по его ID
def getTime(request):
    timeID = json.loads(request.body.decode("utf-8"))['timeID']
    time = TimeSerializer(getTimeByID(timeID))
    return JsonResponse(time.data)

#Получение списка докторов по их полю speciality
def getDoctorBySpeciality(request):
    specialityName = json.loads(request.body.decode("utf-8"))['speciality']
    doctorsList = getDoctorsList(specialityName)
    doctors = []
    for i in doctorsList:
        doctors.append(DoctorSerializer(i).data)
    return JsonResponse(doctors, safe=False)

#Получение первых 10 свободных дат объекта Doctor по его ID
def getWorkDates(request, id):    
    dates = getDates(id)
    return JsonResponse(dates, safe=False)

#Получение свободных дат объекта Doctor по его ID и выбранной дате пользовтелем
def getFreeTime(request, id):
    workTime = []
    date = json.loads(request.body.decode("utf-8"))['choosenDate']
    workTimeList = getDoctorTime(id, date)
    for i in workTimeList:
        workTime.append(TimeSerializer(i).data['currentTime'])
    workTime = getTimeFree(id, date, workTime)
    return JsonResponse(workTime, safe=False)