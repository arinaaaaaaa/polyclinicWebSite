from django.contrib import admin
from .models import Day, DayOfWeek, Doctor, Time

admin.site.register(Doctor)
admin.site.register(Time)
admin.site.register(Day)
admin.site.register(DayOfWeek)