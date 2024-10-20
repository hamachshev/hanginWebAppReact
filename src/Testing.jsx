import "./reset.css"
import "./css.less"
import { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import ModalContent from "./ModelContent";
import Sidebar from "./Sidebar";
import MessagesBox from "./MessagesBox";
import Cookies from 'js-cookie';

export default function Testing(){
    const [showGetOTP, setShowGetOTP] = useState(true)
    const [showInputOTP, setShowInputOTP] = useState(false)
    const [number, setNumber] = useState(0)
    const [getChats, setGetChats] = useState(false)
    const [chats, setChats] = useState([])
    const [socket, setSocket] = useState()
    const [selectedChat, setSelectedChat] = useState(null)



    useEffect(()=>{
      
        const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL + Cookies.get('auth_token')) 
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
                setChats((chats)=>[...chats, msg.message.ownChat])
                // navigate("/chat/" + msg.message.ownChat)
              }
              if(msg.message.deleteChat){
            
                setChats((chats)=>chats.filter((chat)=>chat != msg.message.deleteChat))
                
              }
          }

          setSocket(socket);
          
    }},[getChats])


    return(
    <>
    {showGetOTP && createPortal(
        <ModalContent onClose={(number) => {
            setNumber(number)
            setShowGetOTP(false)
            setShowInputOTP(true)
        }}
        titleText="Sign in to get started"
        fieldText="Enter phone number"
        buttonText="Next"
        type="phone"
         />,
        document.body
      )}

      {showInputOTP && createPortal(
        <ModalContent onClose={() => {
            setShowInputOTP(false)
            setGetChats(true)
        }}
        titleText="Input the code"
        fieldText="6 digit code"
        buttonText="Go"
        type="code"
        number = {number}
         />,
        document.body
      )}
      
     <div className="flexbox-container">  
        <div className="header">
            <img className="logo" src='/images/hangin.svg'/>
            <svg className="settings" xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
  <circle cx="27.1292" cy="27.1141" r="26.8177" fill="#063F78"/>
</svg>
        </div>
        <div className="bottomBox">
            <Sidebar {...{ socket, chats, setSelectedChat, selectedChat}}/>
            <MessagesBox {...{selectedChat, socket}}/>
            
        </div>
    </div> 

    </>

    )
}