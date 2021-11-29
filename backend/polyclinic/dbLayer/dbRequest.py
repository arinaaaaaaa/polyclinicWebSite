#Получение всех объектов Polyclinic
from polyclinic.models import Polyclinic

def getAllPolyclinics():
    return Polyclinic.objects.all()