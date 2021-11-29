from notes.dbLayer.dbRequest import createNewNote, getNote, deleteNote, getNotesByPatientID, getNotesByDoctorID

#Создание новой записи
def noteCreating(jsonData):
    if jsonData['comment'] == None:
        jsonData['comment'] = ""
    createNewNote(jsonData)

#Удаление созданной записи
def noteDeleting(jsonData):
    noteDelete = getNote(jsonData['patientID'], jsonData['doctorID'])
    deleteNote(noteDelete)

#Получение всех объектов Note по ID Patient
def getPatientNotes(id):
    patientNotes = []
    for i in getNotesByPatientID(id):
        patientNotes.append(i)
    return patientNotes

#Получение всех объектов Note по ID Doctor
def getDoctorNotes(id):
    doctorNotes = []
    for i in getNotesByDoctorID(id):
        doctorNotes.append(i)
    return doctorNotes