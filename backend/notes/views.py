import json
from django.http.response import HttpResponse, JsonResponse
from notes.models import Note
from rest_framework import serializers
from notes.serviceLayer.noteServices import noteCreating, noteDeleting, getPatientNotes, getDoctorNotes

#Сериализация объектов Note
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["patient", "doctor", "date", "time", "patientComment"]

def saveFile(request):
    fileGet = request.FILES['file']
    with open(fileGet.name, 'wb') as file:
        file.write(fileGet.read())
    return HttpResponse({'status': '200'})

#Создание объектов Note
def createNote(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    try:
        noteCreating(jsonData)
        return JsonResponse({'status': 'OK'})
    except:
        return JsonResponse({'status':'ALREADY EXISTS'})

#Отмена созданной записи
def cancelNote(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    noteDeleting(jsonData)
    return HttpResponse('200')

#Получение всех записей объекта Patient
def patientNotes(request):
    patientID = json.loads(request.body.decode('utf8').replace("'", '"'))['patientID']
    patientNotesList = getPatientNotes(patientID)
    patientNotes = []
    for i in patientNotesList:
        patientNotes.append(NoteSerializer(i).data)
    return JsonResponse(patientNotes, safe=False)

#Получение всех записей объекта Doctor
def doctorNotes(request):
    doctorID = json.loads(request.body.decode('utf8').replace("'", '"'))['doctorID']
    doctorNotesList = getDoctorNotes(doctorID)
    doctorNotes = []
    for i in doctorNotesList:
        doctorNotes.append(NoteSerializer(i).data)
    return JsonResponse(doctorNotes, safe=False)