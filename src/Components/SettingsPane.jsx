import styles from "../Css/SettingsPane.module.css"
import { useEffect, useState, useRef } from "react"
import { useOutsideClick } from "outsideclick-react";
import Cookies from "js-cookie"

export default function SettingsPane({setEditing, editing, setShowSettings}){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const lastNameRef = useRef(null)

    const ref = useOutsideClick(()=>{
        setShowSettings(false)
        console.log("outside.....")
    })

    const handleEnterSubmit = (e)=>{
        if(e.key === 'Enter'){
            handleDoneClick()
        }
    }

    const handleEnterNext = (e)=>{
        if(e.key === 'Enter'){
            lastNameRef.current.focus();
        }
    }

    useEffect( ()=>{
        async function fetchData() {
           
        const url =`${import.meta.env.VITE_BASE_URL}user?access_token=${Cookies.get("auth_token")}`
        console.log(url)
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': "skip"
              },
        })
        console.log(res)
        const json = await res.json()
        console.log(json)
        if(json){
            
            if(json.first_name)
                setFirstName(json.first_name)
            if(json.last_name)
                setLastName(json.last_name)

           
        }
    }
        fetchData()
     },[])
    const  handleEditClick = (e) => {
        setEditing(true)
    }

    const handleDoneClick = async (e) => {

        if(firstName == "" && lastName == ""){
            setEditing(false)
            return
        }
        
        const url =`${import.meta.env.VITE_BASE_URL}user?access_token=${Cookies.get("auth_token")}`
        const user = { user: {
            ...(firstName != "" ? {first_name: firstName} : {}), 
            ...(lastName != "" ? {last_name: lastName} : {}), 
        }}
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(user)
        })

        const json = await res.json()
        console.log(json)

        if(json){
            console.log(res)
            if(json.first_name)
                setFirstName(json.first_name)
            if(json.last_name)
                setLastName(json.last_name)

            setEditing(false)
        }
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value); 
      };

      const handleLastNameChange = (event) => {
        setLastName(event.target.value); 
      };
    return (
        <div className={styles.settingsPane} ref={ref}>
                <div className={styles.editButtonWrapper} >
                    {!editing && 
                <div className={styles.editButton} onClick={handleEditClick}>
                    <svg className={styles.editLogo}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path fill="#DAEFFB" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                    </div>
                    }  

                    {editing && 
                <div className={styles.editButton} onClick={handleDoneClick}>
                    <svg className={styles.editLogo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#DAEFFB" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                    </div>
                    }       
                    
                </div>
                
                <div className={styles.wrapperNameAndPhoto}>
                {!editing && 
                <>
                <div className={styles.profilePhoto}/>
                <div className={styles.nameBox}>
                    <p>{firstName}</p>
                    <p> {lastName}</p>
                </div>
                </>}

                {editing && 
                <>
                <div className={styles.profilePhoto}/>
                <div className={styles.nameBox}>
                    <input autoFocus className={styles.input} type="text" placeholder={firstName} onChange={handleFirstNameChange}  onKeyDown={handleEnterNext}/>
                    <input className={styles.input} type="text" placeholder={lastName} onChange={handleLastNameChange} onKeyDown={handleEnterSubmit} ref={lastNameRef}/>
                    
                </div>
                </>}
                </div>

                
            </div>
    )
}