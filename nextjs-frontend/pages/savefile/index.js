import axios from 'axios';
import React, { useState } from 'react';
import styles from '../../styles/save.module.css'

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
            <Header/>
            <div className={styles.sendFileForm}>
                <form>
                    <p className={styles.title}>Загрузите файл</p>
                    <input type="file" onChange = { getFileFromForm }/>
                    <button className={styles.sendFile} type='submit' onClick = {sendFile}>Отправить</button>
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default SendFile;