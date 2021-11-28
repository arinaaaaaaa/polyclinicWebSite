import json
from django.contrib.auth.models import User
from django.http.response import JsonResponse
import datetime
from rest_framework import serializers
from polyclinic.views import PolyclinicSerializer
from doctor.models import Time
from doctor.models import Doctor
from notes.models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name"]

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    polyclinic = PolyclinicSerializer()
    class Meta:
        model = Doctor
        fields = ["id", "userType", "user", "patronymic", "speciality", "birthDate", "polyclinic", "room"]

class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ["currentTime"]

def getDoctorData(request):
    doctor = DoctorSerializer(Doctor.objects.get(pk = request.session['userID']))
    return JsonResponse(doctor.data)

def getDoctorBySpeciality(request):
    specialityName = json.loads(request.body.decode("utf-8"))['speciality']
    doctors = []
    for i in Doctor.objects.all().filter(speciality = specialityName):
        doctors.append(DoctorSerializer(i).data)
    return JsonResponse(doctors, safe=False)

def getWorkDates(request, id):
    doctorNotes = Note.objects.all().filter(doctor_id=id)
    schedule = {}
    dates = []
    currentDate = datetime.datetime.today().date()
    doctor = Doctor.objects.all().filter(id = id)[0]
    workDaysList = doctor.workDays.all()
    workDaysIndexList = []
    for i in workDaysList:
        workDaysIndexList.append(i.index)
    while (len(dates) < 10):
        if (currentDate.weekday() in workDaysIndexList):
            dates.append(currentDate)
        currentDate += datetime.timedelta(days=1)
    return JsonResponse(dates, safe=False)

def getFreeTime(request, id):
    workTime = []
    for i in Time.objects.all().filter(doctor = id):
        time = (TimeSerializer(i).data['currentTime']).split(':')
        workTime.append(time[0]+":"+time[1])
    workTime = sorted(workTime)
    return JsonResponse(workTime, safe=False)
