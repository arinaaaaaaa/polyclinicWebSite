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
        fields = ["id", "currentTime"]

def getDoctorData(request):
    doctor = DoctorSerializer(Doctor.objects.get(pk = request.session['userID']))
    return JsonResponse(doctor.data)

def getDoctorByID(request):
    doctorID = json.loads(request.body.decode("utf-8"))['doctorID']
    doctor = DoctorSerializer(Doctor.objects.get(id = doctorID))
    return JsonResponse(doctor.data)

def getTimeByID(request):
    timeID = json.loads(request.body.decode("utf-8"))['timeID']
    time = TimeSerializer(Time.objects.get(id = timeID))
    return JsonResponse(time.data)
    
def getDoctorBySpeciality(request):
    specialityName = json.loads(request.body.decode("utf-8"))['speciality']
    doctors = []
    for i in Doctor.objects.all().filter(speciality = specialityName):
        doctors.append(DoctorSerializer(i).data)
    return JsonResponse(doctors, safe=False)

def getWorkDates(request, id):
    doctor = Doctor.objects.all().filter(id=id)
    doctorNotes = Note.objects.all().filter(doctor_id=id)
    dates = []
    currentDate = datetime.datetime.today().date()
    doctor = Doctor.objects.all().filter(id = id)[0]
    workDaysList = doctor.workDays.all()
    workDaysIndexList = []
    for i in workDaysList:
        workDaysIndexList.append(i.index)
    while (len(dates) < 10):
        if (currentDate.weekday() in workDaysIndexList and len(doctorNotes.filter(date=currentDate)) < len(doctor.availableTimes.all())):
            dates.append(currentDate)
        currentDate += datetime.timedelta(days=1)
    return JsonResponse(dates, safe=False)

def getFreeTime(request, id):
    workTime = []
    date = json.loads(request.body.decode("utf-8"))['choosenDate']
    print(date)
    for i in Time.objects.all().filter(doctor = id):
        time = (TimeSerializer(i).data['currentTime'])
        timeID = TimeSerializer(i).data['id']
        note = Note.objects.all().filter(doctor_id = id, date = date)
        count = 0
        for j in note:
            if str(j.time) == time:
                count += 1
        if count == 0:
            time = time.split(':')
            workTime.append(time[0]+":"+time[1])
    workTime = sorted(workTime)
    return JsonResponse(workTime, safe=False)
