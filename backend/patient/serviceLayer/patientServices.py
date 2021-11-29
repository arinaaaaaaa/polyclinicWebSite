from patient.dbLayer.dbRequest import savePatient, getPatientByUserID, getPatientByID

#Создание нового объекта Patient
def patientCreating(jsonData):
    savePatient(jsonData)

#Получение объекта Patient по ID его user
def getPatientUserID(userID):
    return getPatientByUserID(userID)

#Получение объекта Patient по его ID
def getPatient(patientID):
    return getPatientByID(patientID)