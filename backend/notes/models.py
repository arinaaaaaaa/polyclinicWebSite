from datetime import datetime, time
from django.db import models
from django.db.models.deletion import CASCADE
from django.http.response import HttpResponse
from patient.models import Patient
from doctor.models import Doctor, Time

class Note (models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField(verbose_name="Дата приема")
    time = models.ForeignKey(Time, on_delete=CASCADE, blank=True)
    patientComment = models.CharField(max_length=300, blank=True)

    @classmethod
    def create(cls, patientID, doctorID, dateValue, timeValue, patientComment):
        timeValue = (str(datetime.strptime(timeValue, '%H:%M')).split(' ')[1])
        time = Time.create(timeValue)
        note = cls(patient = Patient.objects.get(id=patientID), doctor = Doctor.objects.get(id=doctorID), date = dateValue, time = time, patientComment = patientComment)
        note.save()