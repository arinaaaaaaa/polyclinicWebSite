from doctor.models import Time
from notes.models import Note
from doctor.models import Doctor

#Получение объекта Doctor по его ID
def getDoctorByID(id):
    return Doctor.objects.all().filter(id = id)

#Получение объекта Doctor по ID его user
def getDoctorByUserID(userID):
    return Doctor.objects.get(pk = userID)

#Получение свободных дат для записи ко врачу по его ID
def getDoctorNotesByDoctorID(id):
    return Note.objects.all().filter(doctor_id=id)

#Получение объекта Time по его ID
def getTimeByID(id):
    return Time.objects.get(id = id)

#Получение списка Doctor по полю speciality
def getDoctorsBySpeciality(speciality):
    return Doctor.objects.all().filter(speciality = speciality)

#Получение времени по ID объекта Doctor
def getDoctorFreeTime(id):
    return Time.objects.all().filter(doctor = id)

#Получение записей по Doctor ID и дате
def getNoteByIDDate(id, date):
    return Note.objects.all().filter(doctor_id = id, date = date)