import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';


var socket
const handleNewChat = (e) => {
  const msg = {
    
      command: "message",
      identifier: JSON.stringify({
        channel: 'ChatsChannel'
    }),
      "data": JSON.stringify({
        action: 'createChat'
    })
      
  }
  
  socket.send(JSON.stringify(msg))
}

export default function ChatsPage(){
    const [chats, setChats] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
      
        socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL + Cookies.get('auth_token')) 
        socket.onopen = function (e){
          console.log("connected to websocket")
          const msg = {
            command:'subscribe',
            identifier: JSON.stringify({
              channel: 'ChatsChannel'
          }),}
    
          socket.send(JSON.stringify(msg))
        }
        socket.onmessage = function(e) {            
          const msg = JSON.parse(e.data);
          
          
          if (msg.type === "ping") {
              return;
          }
          console.log("FROM RAILS: ", msg);
          
          
          if (msg.message) {
              if(msg.message.chats){
                setChats(msg.message.chats)
                console.log(msg.message.chats)
              }
              if(msg.message.chat){
                setChats((chats)=>[...chats, msg.message.chat.id])
              }
              if(msg.message.ownChat){
                // setChats((chats)=>[...chats, msg.message.ownChat])
                navigate("/chat/" + msg.message.ownChat)
              }
              if(msg.message.deleteChat){
            
                setChats((chats)=>chats.filter((chat)=>chat != msg.message.deleteChat))
                
              }
          }
          
    }},[])
  

    return (
      <>
      <ul>
      {chats.map((chat)=>{
        return (
          <li key={chat} ><Link to={"/chat/" + chat}>{chat}</Link></li>
        )
      })}
      </ul>
      <button onClick={handleNewChat}>
        New Chat
      </button>
      </>
    )
}