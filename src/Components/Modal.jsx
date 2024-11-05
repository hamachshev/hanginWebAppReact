import { useState } from "react";
import Cookies from 'js-cookie';
import styles from '../Css/Modal.module.css'




export default function Modal({onClose, titleText, buttonText, fieldText, type, number}) {

  const [inputValue, setInputValue] = useState(''); 
  const handleInputChange = (event) => {
    setInputValue(event.target.value); 
  };

  async function send_phone_number(e){
    const  res = await fetch(`${import.meta.env.VITE_BASE_URL}/create?number=` + inputValue, { //this might have an extra slash
      method: 'POST',
    })

    if (res){
      onClose(inputValue);
    }
    

  }

  async function send_code(e){
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}oauth/token?client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}&grant_type=password&number=` + number + '&code=' + inputValue, {
      method: 'POST',
    })
    const json = await res.json();
    console.log(json)
    Cookies.set('auth_token', json.access_token, {expires: 30})
    Cookies.set('uuid', json.uuid, {expires: 30})
    Cookies.set('created_at', json.created_at, {expires: 30})
    Cookies.set('expires_in', json.expires_in, {expires: 30})
    Cookies.set('refresh_token', json.refresh_token, {expires: 30})
    if(json){

      onClose();
    }
      
  };
    return (
        <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <img src='/images/hangin.svg'/>
        <p>{titleText}</p>
        <input type="text" onChange={handleInputChange} placeholder={fieldText}/>
        <button onClick={type == "phone" ? send_phone_number : send_code}>{buttonText}</button>
      </div>
      </div>
    );
  }