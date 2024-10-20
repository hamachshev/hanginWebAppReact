import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SubmitOTP = (props) => {
    const [inputValue, setInputValue] = useState(''); // Initialize state with an empty string

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update state with the value from the input field
  };

const {state} = useLocation()
const navigate = useNavigate()

 async function send_number(e){
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/oauth/token?client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}&grant_type=password&number=` + state.number + '&code=' + inputValue, {
      method: 'POST',
    })
    const json = await res.json();
    console.log(json)
    Cookies.set('auth_token', json.access_token)
    if(json){
      navigate('/chats')
    }
      
  };
  


  return (
    <div>
      <label>
        Enter OTP number: 
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange}
        />
      </label>
      <button onClick={send_number}>Submit</button>
      <p>You typed: {inputValue}</p> 
    </div>
  );
}
export default SubmitOTP