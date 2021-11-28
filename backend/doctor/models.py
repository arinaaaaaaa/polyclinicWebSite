from django.db import models
from django.db.models.deletion import CASCADE
from django.contrib.auth.models import User
from django.db.models.fields.related import ManyToManyField
from model_utils import Choices
from polyclinic.models import Polyclinic
                
class Day(models.Model):
    currentDate = models.DateField(verbose_name="День приема")

class DayOfWeek(models.Model):
    name = models.CharField(verbose_name="Название дня недели", max_length=2)
    index = models.IntegerField(verbose_name="Номер дня недели", blank=True)
    def __str__(self) -> str:
        return self.name

class Time(models.Model):
    currentTime = models.TimeField(verbose_name="Время приема")
    def __str__(self) -> str:
        return str(self.currentTime)
    
    @classmethod
    def create(cls, currentTime):
        tInstance = cls(currentTime = currentTime)
        tInstance.save()
        return tInstance

specialityChoice = ('Участковый врач', 'Уролог', 'Хирург', 'Оторноларинголог', 'Диспансеризация/Профилактический мед.осмотр', 'Офтальмолог', 'Медицинский пост', 'Вакцинация от COVID-19', 'Мазок на COVID-19 (ПЦР)', 'Кровь (антитела COVID-19)')

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=CASCADE)
    patronymic = models.CharField(max_length=50, null=True)
    birthDate = models.DateField(null=False)
    speciality = models.CharField(max_length=200, choices=Choices(*specialityChoice))
    polyclinic = models.ForeignKey(Polyclinic, on_delete=models.CASCADE)
    workDays = models.ManyToManyField(DayOfWeek)
    availableTimes = ManyToManyField(to=Time)
    room = models.IntegerField(blank = True)
    userType = "doctor"