import datetime
from doctor.dbLayer.dbRequests import getDoctorByID, getDoctorNotesByDoctorID, getDoctorByUserID, getTimeByID, getDoctorsBySpeciality, getDoctorFreeTime, getNoteByIDDate

#Получение объекта Doctor по его ID
def getDoctor(id):
    return getDoctorByID(id)[0]

#Получение объекта Doctor по ID его user
def getDoctorDataUserID(userID):
    return getDoctorByUserID(userID)

#Получение свободных дат для записи ко врачу по его ID
def getDates(id):
    doctor = getDoctorByID(id)[0]
    workDaysIndexList = []
    dates = []
    currentDate = datetime.datetime.today().date()
    doctorNotes = getDoctorNotesByDoctorID(id)
    workDaysList = doctor.workDays.all()
    for i in workDaysList:
        workDaysIndexList.append(i.index)
        while (len(dates) < 10):
            if (currentDate.weekday() in workDaysIndexList and len(doctorNotes.filter(date=currentDate)) < len(doctor.availableTimes.all())):
                dates.append(currentDate)
            currentDate += datetime.timedelta(days=1)
    return dates

#Получение объекта Time по его ID
def getTime(id):
    return getTimeByID(id)

#Получение списка Doctor по значению их поля speciality
def getDoctorsList(speciality):
    doctors = []
    for i in getDoctorsBySpeciality(speciality):
        doctors.append(i)   
    return doctors

#Получение свободного времени объекта Doctor по его ID и дате, выбранной пользователем
def getDoctorTime(id, choosenDate):
    workTime = []
    for i in getDoctorFreeTime(id):
        workTime.append(i)
    return workTime

def getTimeFree(id, choosenDate, workTimeList):
    workTime = []
    for i in workTimeList:
        time = i
        note = getNoteByIDDate(id, choosenDate)
        count = 0
        for j in note:
            if str(j.time) == time:
                count += 1
        if count == 0:
            time = time.split(':')
            workTime.append(time[0]+":"+time[1])
    workTime = sorted(workTime)
    return workTime