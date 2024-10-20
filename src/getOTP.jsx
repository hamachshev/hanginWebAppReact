import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const GetOTP = () => {
    const [inputValue, setInputValue] = useState(''); 
  const handleInputChange = (event) => {
    setInputValue(event.target.value); 
  };
  const navigate = useNavigate()

  async function send_number(e){
    const  res = await fetch(import.meta.env.VITE_BASE_URL + "create?number=" + inputValue, {
      method: 'POST',
    })

    if (res){

      navigate('/submit', {state: {number: inputValue}})
    }
    

  }


  return (
    <div>
      <label>
        Enter number: 
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
export default GetOTP;