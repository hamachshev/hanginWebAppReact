import "../Css/reset.css"
import "../css.less"
import { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import MessagesBox from "./MessagesBox";
import Cookies from 'js-cookie';
import Header from "./Header";

export default function HomePage(){
    const [showGetOTP, setShowGetOTP] = useState(false)
    const [showInputOTP, setShowInputOTP] = useState(false)
    const [number, setNumber] = useState(0)
    const [getChats, setGetChats] = useState(null)
    const [chats, setChats] = useState([])
    const [socket, setSocket] = useState()
    const [selectedChat, setSelectedChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [onlineContacts, setOnlineContacts] = useState([])



    useEffect(()=>{
       console.log("auth tokemn " + Cookies.get('auth_token'));
        
        var socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL + Cookies.get('auth_token')) 
        socket.onopen = function (e){
          console.log("connected to websocket")
          const msg = { //https://stackoverflow.com/questions/35320791/how-to-use-actioncable-as-api
            command:'subscribe',
            identifier: JSON.stringify({
              channel: 'ChatsChannel'
          }),}
    
          socket.send(JSON.stringify(msg))
        }
        socket.onmessage = function(e) {            
          const msg = JSON.parse(e.data);
          
          if(msg.type === "disconnect" && msg.reason === "unauthorized"){
            async function fetchAuthIfRefresh() {

                    print("getting new auth token")
                    // const timestamp = new Date().getTime() // https://stackoverflow.com/questions/8047616/get-a-utc-timestamp
                    const url =`${import.meta.env.VITE_BASE_URL}oauth/token?client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${Cookies.get("refresh_token")}`
                    console.log(url)
                    // if(parseInt(Cookies.get("created_at")) + parseInt(Cookies.get("expires_in")) < timestamp  /* seconds in a day*/){
                      const res = await fetch(url, {
                        method: 'POST',
                      })
                      const json = await res.json();
                      console.log(json)
                      if(json.access_token){
                        Cookies.set('auth_token', json.access_token, {expires: 30})
                        Cookies.set('created_at', json.created_at, {expires: 30})
                        Cookies.set('expires_in', json.expires_in, {expires: 30})
                        Cookies.set('refresh_token', json.refresh_token, {expires: 30})
                        setShowGetOTP(false)
                        setGetChats(true)
                        }
                      
                    
                  
                    // }
                    // return
                
                }
                if(Cookies.get('auth_token') === "undefined" || Cookies.get('auth_token') === undefined){
                  
                  setShowGetOTP(true)
                  
                } else {
                  fetchAuthIfRefresh();
                }
          }
          
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
                setChats((chats)=>[msg.message.chat, ...chats])
              }
              if(msg.message.ownChat){
                setChats((chats)=>[msg.message.ownChat,...chats])
                // navigate("/chat/" + msg.message.ownChat)
              }
              if(msg.message.deleteChat){
            
                setChats((chats)=>chats.filter((chat)=>chat.id != msg.message.deleteChat))
                
              }
              if(msg.message.updateChat){
            
                setChats((chats)=>[
                  msg.message.updateChat,
                  ...chats.filter((chat)=>chat.id != msg.message.updateChat.id), 
                  ])
                
              }

              if(msg.message.contactsOnline){
            
                setOnlineContacts(msg.message.contactsOnline)
                
              }

              if(msg.message.contactOnline){
            
                setOnlineContacts((contacts)=>[msg.message.contactOnline, ...contacts])
                
              }

              if(msg.message.contactOffline){
            
                setOnlineContacts((contacts)=> contacts.filter((contact)=> contact.uuid !== msg.message.contactOffline))
                
              }
              
                console.log("YOUVE GOT Mail!")
                  console.log(msg)
                  if(msg.message.messages){
                    setMessages(msg.message.messages)
                  }
                  if(msg.message.message){
                    setMessages((messages) => [...messages, msg.message.message]);
                  }
              
          }

          setSocket(socket);
          
    }},[getChats])



    return(
    <>
    {showGetOTP && createPortal(
        <Modal onClose={(number) => {
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
        <Modal onClose={() => {
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
        <Header/>
        <div className="bottomBox">
            <Sidebar {...{ socket, chats, setSelectedChat, selectedChat, onlineContacts}}/>
            <MessagesBox {...{selectedChat, socket, messages}}/>
            
        </div>
    </div> 

    </>

    )
}