import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Chats(){
    useEffect(()=>{
        const socket = new WebSocket("ws://localhost:3000/cable?access_token=" + Cookies.get('auth_token')) 
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
          
          // // Renders any newly created messages onto the page.
          // if (msg.message) {
          //     renderMessage(msg.message)
          // }
    }},[])
}