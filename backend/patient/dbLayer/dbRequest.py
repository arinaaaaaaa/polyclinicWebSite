from patient.models import Patient

#Создание нового объекта Patient
def savePatient(jsonData):
    Patient.create(jsonData['name'], jsonData['surname'], jsonData['patronymic'], jsonData['birthDate'], jsonData['email'], jsonData['polis'], jsonData['login'], jsonData['password'])

#Получение объекта Patient по ID его user
def getPatientByUserID(userID):
    return Patient.objects.get(pk = userID)

#Получение объекта Patient по его ID
def getPatientByID(patientID):
    return Patient.objects.get(id = patientID)