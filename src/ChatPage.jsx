import { Routes, Route, useParams, useLocation, useBeforeUnload } from 'react-router-dom';
import { useState, useEffect, useBlocker } from 'react';
import Cookies from 'js-cookie';

var socket

export default function ChatPage(){

    const {id} = useParams()
    const [outgoingMessage, setOutgoingMessage] = useState('')
    const [messages, setMessages] = useState([])
    

const handleMessageInputChange = (e) =>{
    setOutgoingMessage(e.target.value)
}


useEffect(()=>{
    socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL + Cookies.get('auth_token')) 
    socket.onopen = function (e){
      console.log("connected to websocket")
      const msg = {
        command:'subscribe',
        identifier: JSON.stringify({
          channel: 'ChatChannel',
          id: id,
      }),}

      socket.send(JSON.stringify(msg))
    }
    socket.onmessage = function(e) {            
      const msg = JSON.parse(e.data);
      
      
      if (msg.type === "ping") {
          return;
      }
      console.log("FROM RAILS: ", msg);
      
      
      if (msg) {
        console.log("YOUVE GOT Mail!")
          console.log(msg.message.message.body)
          if(msg.message.message){
            setMessages((messages) => [...messages, msg.message.message.body]);
          }
      }
      
}},[])

// window.addEventListener('popstate', function(event) {
//   console.log("leaving")
//   console.log("disconnecting from websocket")
//       const msg = {
//         command:'unsubscribe',
//         identifier: JSON.stringify({
//           channel: 'ChatChannel',
//           id: id,
//       }),}


//       socket.send(JSON.stringify(msg))
// });

const sendMessage = (e)=> {
    console.log("sending message")
    const msg = {
        command:'message',
        identifier: JSON.stringify({
          channel: 'ChatChannel',
          id: id,
      }),
      data: JSON.stringify({
        action: 'speak',
        body: outgoingMessage,
        kind: "text",
        status: "sent",
      })
    }

      socket.send(JSON.stringify(msg))
}


    return (
        <>
        <h1> Welcome to chat {id}!!</h1><br/>
        <ul>
        {messages.map((message, key)=>{ //its item, index for some reason not key value
            return (
            <li key={key}>{message}</li>
            )
        }
        )}
        </ul>
        <label>
        Enter message: 
        <input 
          type="text" 
          value={outgoingMessage} 
          onChange={handleMessageInputChange} 
        />
      </label>
      <button onClick={sendMessage}>Submit</button>
        </>
    )
}