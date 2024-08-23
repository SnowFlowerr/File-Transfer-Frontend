import React, { useState } from 'react'
import axios from 'axios'

export default function Home() {
    const [file, setFile] = useState("")
    const [name, setName] = useState("")
    const [text, setText] = useState("")
    const [img, setImg] = useState("")
    const [err, setErr] = useState("")
    
    function handleChange(e) {
        e.preventDefault();
        if(e.target.id==='file'){
            setFile(e.target.files[0])
        }
        else if(e.target.id==='name'){
            setName(e.target.value)
        }
        else if(e.target.id==='text'){
            setText(e.target.value)
        }
    }
    async function sendFile(e) {
        e.preventDefault();
        const formData=new FormData()
        formData.append('file',file)
        formData.append('name',name)
        formData.append('text',text)
        try{
            const data=await axios.post('http://localhost:800/formData/data',formData)
            setImg(data?.data)
            console.log(data.data)
        }
        catch(err){
            setErr(err.message)
            console.log(err)
        }

    }
    return (
        <div>
            <form action="" onSubmit={sendFile}>
                <input type="file" id='file' onChange={handleChange} /> <br />
                <input type="text" id='name' placeholder="Enter Your Name" onChange={handleChange}/><br />
                <textarea id="text" placeholder='Enter Your Text' onChange={handleChange}></textarea> <br />
                <button onClick={sendFile}>Send</button>
            </form>
            <div>
                <div>{file.name}</div>
                <div>{file.type}</div>
                <div>{file.size && "bytes"}</div>
            </div>
            
                {name}
                {text}
                {err&&err}
                <a href={img?.image}>{img?.image}</a>
                <img src={img?.image} alt="" width="100%"/>
        </div>
    )
}
