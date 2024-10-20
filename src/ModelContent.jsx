import { useState } from "react";
import Cookies from 'js-cookie';




export default function ModalContent({onClose, titleText, buttonText, fieldText, type, number}) {

  const [inputValue, setInputValue] = useState(''); 
  const handleInputChange = (event) => {
    setInputValue(event.target.value); 
  };

  async function send_phone_number(e){
    const  res = await fetch(`${import.meta.env.VITE_BASE_URL}/create?number=` + inputValue, {
      method: 'POST',
    })

    if (res){
      onClose(inputValue);
    }
    

  }

  async function send_code(e){
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/oauth/token?client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}&grant_type=password&number=` + number + '&code=' + inputValue, {
      method: 'POST',
    })
    const json = await res.json();
    console.log(json)
    Cookies.set('auth_token', json.access_token)
    Cookies.set('uuid', json.uuid)
    if(json){

      onClose();
    }
      
  };
    return (
        <div className="modal-background">
      <div className="modal">
        <img src='/images/hangin.svg'/>
        <p>{titleText}</p>
        <input type="text" onChange={handleInputChange} placeholder={fieldText}/>
        <button onClick={type == "phone" ? send_phone_number : send_code}>{buttonText}</button>
      </div>
      </div>
    );
  }