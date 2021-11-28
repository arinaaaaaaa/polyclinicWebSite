import axios from 'axios';
import React, { useState } from 'react';
import './Styles/SendFile.css'

function SendFile() {
    const [file, setFile] = useState(null);

    function getFileFromForm(event) {
        setFile(event.target.files[0]);
    }
    function sendFile() {
        var formData = new FormData();
        formData.append('file', file);
        axios.post(
            'http://localhost:8000/notes/data/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
    }
    return (
        <>
            <div className="sendFileForm">
                <form>
                    <p className="title">Загрузите файл</p>
                    <input type="file" onChange = { getFileFromForm }/>
                    <button className="sendFile" type='submit' onClick = {sendFile}>Отправить</button>
                </form>
            </div>
        </>
    )
}

export { SendFile }