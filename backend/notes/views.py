import json
from django.http.response import HttpResponse, JsonResponse
from notes.models import Note
from rest_framework import serializers

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["patient", "doctor", "date", "time", "patientComment"]

def saveFile(request):
    fileGet = request.FILES['file']
    with open(fileGet.name, 'wb') as file:
        file.write(fileGet.read())
    return HttpResponse({'status': '200'})

def createNote(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    try:
        if jsonData['comment'] == None:
            jsonData['comment'] = ""
        Note.create(jsonData['patientID'], jsonData['doctorID'], jsonData['date'], jsonData['time'], jsonData['comment'])
        return JsonResponse({'status': 'OK'})
    except:
        return JsonResponse({'status':'ALREADY EXISTS'})

def cancelNote(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    noteDelete = Note.objects.get(doctor_id = jsonData['doctorID'], patient_id = jsonData['patientID'])
    Note.delete(noteDelete)
    return HttpResponse('200')

def patientNotes(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    patientNotes = []
    for i in Note.objects.all().filter(patient_id = jsonData['patientID']):
        patientNotes.append(NoteSerializer(i).data)
    return JsonResponse(patientNotes, safe=False)

def doctorNotes(request):
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    doctorNotes = []
    for i in Note.objects.all().filter(doctor_id = jsonData['doctorID']):
        doctorNotes.append(NoteSerializer(i).data)
    return JsonResponse(doctorNotes, safe=False)