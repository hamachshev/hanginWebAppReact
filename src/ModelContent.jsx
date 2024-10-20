import { useState } from "react";
import Cookies from 'js-cookie';




export default function ModalContent({onClose, titleText, buttonText, fieldText, type, number}) {

  const [inputValue, setInputValue] = useState(''); 
  const handleInputChange = (event) => {
    setInputValue(event.target.value); 
  };

  async function send_phone_number(e){
    const  res = await fetch('http://localhost:3000/create?number=' + inputValue, {
      method: 'POST',
    })

    if (res){
      onClose(inputValue);
    }
    

  }

  async function send_code(e){
    const res = await fetch('http://localhost:3000/oauth/token?client_id=qCD2AlC5e9r4A2qnwZ6JLhBzoGjh3PT3_0sNPHvU4bg&client_secret=rPQa4a33w1GiJZyBKL3x2dUIVIw1nmOhS5_HvFf4_LU&grant_type=password&number=' + number + '&code=' + inputValue, {
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