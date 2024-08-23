import React, { useState } from 'react'
import axios from 'axios'

export default function Home() {
    const [file, setFile] = useState("")
    const [img, setImg] = useState("")
    const [err, setErr] = useState("")
    
    function handleChange(e) {
        e.preventDefault();
        setFile(e.target.files[0])
    }
    async function sendFile(e) {
        e.preventDefault();
        const formData=new FormData()
        formData.append('file',file)
        try{
            const data=await axios.post('https://file-transfer-backend-production.up.railway.app/formData/data',formData)
            setImg(data?.data)
        }
        catch(err){
            setErr(err.message)
            console.log(err)
        }
        // .then(res=>console.log(res.data))
        // .catch(err=>console.log(err))

    }
    return (
        <div>
            <form action="">
                <input type="file" onChange={handleChange} /> <br />
                {file.name} <br />
                {file.type} <br />
                {file.size} bytes <br />
                <button onClick={sendFile}>Send</button>
                <br />
                {err&&err}
                <a href={img?.image}>{img?.image}</a>
                <img src={img?.image} alt="" width="100%"/>
            </form>
        </div>
    )
}
