from django.db import models

class Polyclinic (models.Model):
    address = models.CharField(max_length=200)

    @classmethod
    def create(cls, address):
        polyclinic = cls(address = address)
        return polyclinic
