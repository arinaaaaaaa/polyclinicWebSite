from notes.models import Note

#Создание новой записи
def createNewNote(jsonData):
    Note.create(jsonData['patientID'], jsonData['doctorID'], jsonData['date'], jsonData['time'], jsonData['comment'])

#Получение записи по ID Patient и Doctor
def getNote(patientID, doctorID):
    return Note.objects.get(doctor_id = doctorID, patient_id = patientID)

#Удаление объекта Note
def deleteNote(note):
    Note.delete(note)

#Получение записей по их patient_id
def getNotesByPatientID(id):
    return Note.objects.all().filter(patient_id = id)

#Получение записей по их doctor_id
def getNotesByDoctorID(id):
    return Note.objects.all().filter(doctor_id = id)