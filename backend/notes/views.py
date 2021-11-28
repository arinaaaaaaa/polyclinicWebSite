import json
from django.http.response import HttpResponse, JsonResponse

from notes.models import Note

def saveFile(request):
    fileGet = request.FILES['file']
    with open(fileGet.name, 'wb') as file:
        file.write(fileGet.read())
    return HttpResponse({'status': '200'})

def createNote(request):
    try:
        jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
        Note.create(jsonData['patientID'], jsonData['doctorID'], jsonData['date'], jsonData['time'], jsonData['comment'])
        return JsonResponse({'status': 'OK'})
    except:
        return JsonResponse({'status':'ALREADY EXISTS'})

def cancelNote(request):
    print(request.body)
    jsonData = json.loads(request.body.decode('utf8').replace("'", '"'))
    noteDelete = Note.objects.get(doctor_id = jsonData['doctorID'], patient_id = jsonData['patientID'])
    Note.delete(noteDelete)
    return HttpResponse('200')
    
