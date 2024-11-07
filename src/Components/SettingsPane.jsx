import styles from "../Css/SettingsPane.module.css"
import { useEffect, useState, useRef } from "react"
import { useOutsideClick } from "outsideclick-react";
import Cookies from "js-cookie"

export default function SettingsPane({setEditing, editing, setShowSettings}){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const lastNameRef = useRef(null)

    const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null)
  const [imageUrlStorage, setImageUrlStorage] = useState(null)

  const fileSelectedHandler = event => {
    console.log(event.target.files[0])
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]))
  }

    const ref = useOutsideClick(()=>{
        setShowSettings(false)
        setImageUrl(null)
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
            if(json.profile_pic)
                setImageUrlStorage(json.profile_pic)

           
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



            const formData = new FormData();
            formData.append('user[profile_picture]', image);
        
            fetch(`${import.meta.env.VITE_BASE_URL}user/addProfilePicture?access_token=`+ Cookies.get("auth_token"), {
              method: 'POST',
              body: formData,
            })
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });


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
                <div className={styles.profilePhoto}>
                    {!imageUrl && !imageUrlStorage &&
                <svg className={styles.photo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                    }
                    {!imageUrl && imageUrlStorage &&
                        <img src={imageUrlStorage}/>
                    }
                    {imageUrl && 
                        <img src={imageUrl}/>
                    }
                    </div>
                <div className={styles.nameBox}>
                    <p>{firstName}</p>
                    <p> {lastName}</p>
                </div>
                </>}

                {editing && 
                <>
                
                <label className={`${styles.profilePhoto} ${styles.profilePhotoEdit}`}>
                <input type="file" accept='image/*' onChange={fileSelectedHandler}/>
                    {!imageUrl && !imageUrlStorage &&
                    <>
                    <svg className={styles.photoNonHover} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                    <svg className={styles.photoHover}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                    </>
                    }
                    {!imageUrl && imageUrlStorage &&
                    <>
                    <svg className={styles.photoHover}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                    <img className={styles.photoNonHover} src={imageUrlStorage}/>
                    </>
}
                    {imageUrl &&
                    <>
                    <svg className={styles.photoHover}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                    <img className={styles.photoNonHover} src={imageUrl}/>
                    </>
                    }
                </label>
                <div className={styles.nameBox}>
                    <input autoFocus className={styles.input} type="text" placeholder={firstName} onChange={handleFirstNameChange}  onKeyDown={handleEnterNext}/>
                    <input className={styles.input} type="text" placeholder={lastName} onChange={handleLastNameChange} onKeyDown={handleEnterSubmit} ref={lastNameRef}/>
                    
                </div>
                </>}
                </div>

                
            </div>
    )
}