import React, { useState } from 'react'
import axios from 'axios'
import "./styles.css"

export default function Home() {
    const [file, setFile] = useState("")
    const [name, setName] = useState("")
    const [text, setText] = useState("")
    const [img, setImg] = useState("")
    const [err, setErr] = useState("")
    const [isSend, setisSend] = useState(false)
    const [isProg, setisProg] = useState(false)
    
    function handleChange(e) {
        e.preventDefault();
        try{
            if(e.target.id==='file'){
                setFile(e.target.files[0])
            }
            else if(e.target.id==='name'){
                setName(e.target.value)
            }
            else if(e.target.id==='text'){
                setText(e.target.value)
            }
            setErr("")
            setisSend(true)
            setImg("")
        }
        catch(err){
            setErr(err.message)
        }
    }
    async function sendFile(e) {
        e.preventDefault();
        setisSend(()=>false)
        setisProg(()=>true)
        if(!file){
            setErr("Enter The file")
            return
        }
        else if(!name){
            setErr("Enter The Name")
            return
        }
        else if(!text){
            setErr("Enter The Text")
            return
        }
        const formData=new FormData()
        formData.append('file',file)
        formData.append('name',name)
        formData.append('text',text)
        try{
            const data=await axios.post('http://localhost:800/formData/data',formData)
            setImg(data?.data)
            // console.log(data.data)
            setErr("")
            setisProg(()=>false)
        }
        catch(err){
            setErr(err.message)
            console.log(err)
        }

    }
    return (
        <div style={{wordWrap:"break-word"}}>
            <form action="" onSubmit={sendFile}>
                <input type="file" id='file' onChange={handleChange} /> <br />
                <input type="text" id='name' placeholder="Enter Your Name" onChange={handleChange}/><br />
                <textarea id="text" placeholder='Enter Your Text' onChange={handleChange}></textarea> <br />
                {isSend && <button onClick={sendFile}>Send</button>}
            </form>
            <div>
                <div>{file?.name}</div>
                <div>{file?.type}</div>
                <div>{file?.duration}</div>
                <div>{file?.size && file?.size + " bytes"}</div>
            </div>
            
            <div style={{color:"red"}}>{err&&err}</div>
                
                <a href={img?.image}>{img?.image}</a>
                <br />
                {isProg&&
                <div className='process'></div>
                }
                <br />
                {
                    !isProg&&<>
                <img src={img?.image} alt="" />
                <video src={img?.image} autoPlay controls width={"400px"}></video>
                </>
                }
        </div>
    )
}
