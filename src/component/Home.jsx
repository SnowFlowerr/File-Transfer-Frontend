import React, { useState } from 'react'
import axios from 'axios'

export default function Home() {
    const [file, setFile] = useState("")
    function handleChange(e) {
        e.preventDefault();
        setFile(e.target.files[0])
    }
    async function sendFile(e) {
        e.preventDefault();
        const formData=new FormData()
        formData.append('file',file)
        try{
            const data=await axios.post('http://localhost:800/formData/data',formData)
            // console.log(data.data)
        }
        catch(err){
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
            </form>
        </div>
    )
}
