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
    const res = await fetch('http://localhost:3000/oauth/token?client_id=qCD2AlC5e9r4A2qnwZ6JLhBzoGjh3PT3_0sNPHvU4bg&client_secret=rPQa4a33w1GiJZyBKL3x2dUIVIw1nmOhS5_HvFf4_LU&grant_type=password&number=' + state.number + '&code=' + inputValue, {
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