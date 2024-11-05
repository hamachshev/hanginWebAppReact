import styles from '../Css/MessagesBox.module.css'
import {useState, useEffect, useRef} from 'react'
import Cookies from 'js-cookie';
export default function MessagesBox({selectedChat, socket, messages}){
    const [outgoingMessage, setOutgoingMessage] = useState('')

    const handleMessageInputChange = (e) =>{
        setOutgoingMessage(e.target.value)
    }

    // const socketRef = useRef(null)
    const textFieldRef = useRef(null)
    const messagesStreamRef = useRef(null)

    const handleEnter= (e)=>{
        if(e.key === 'Enter'){
            sendMessage()
        }
    }

    useEffect(()=>{
        // if(socketRef.current){
        //     socketRef.current.close();
        // }
        // socketRef.current = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL + Cookies.get('auth_token')) 
        // socketRef.current.onopen = function (e){
        //   console.log("connected to websocket")
          const msg = {
            command:'subscribe',
            identifier: JSON.stringify({
              channel: 'ChatChannel',
              id: selectedChat ? selectedChat.id : "",
          })}
    
        //   socketRef.current.send(JSON.stringify(msg))
        if(socket != null)
            socket.send(JSON.stringify(msg))
        
        // socketRef.current.onmessage = function(e) {            
        //   const msg = JSON.parse(e.data);
          
          
        //   if (msg.type === "ping") {
        //       return;
        //   }
        //   console.log("FROM RAILS: ", msg);
          
          
        //   if (msg) {
        //     console.log("YOUVE GOT Mail!")
        //       console.log(msg)
        //       if(msg.message.messages){
        //         setMessages(msg.message.messages)
        //       }
        //       if(msg.message.message){
        //         setMessages((messages) => [...messages, msg.message.message]);
        //       }
        //   }


          
    
        return () => { //cleanup, ie unsub from the current chat before subbing to a new one
            if(socket){
            console.log("unsubscribe to websocket")
            const msg = {
              command:'unsubscribe',
              identifier: JSON.stringify({
                channel: 'ChatChannel',
                id: selectedChat ? selectedChat.id : "",
            }),}
      
            socket.send(JSON.stringify(msg))
        }
            
        }
},[selectedChat])

    useEffect(()=>{
        messagesStreamRef.current.scrollTop = messagesStreamRef.current.scrollHeight // https://www.geeksforgeeks.org/how-to-scroll-to-bottom-of-div-in-javascript/
    }, [messages])

    const sendMessage = (e)=> {
        if(outgoingMessage === ""){
            return
        }
        console.log("sending message")
        const msg = {
            command:'message',
            identifier: JSON.stringify({
              channel: 'ChatChannel',
              id: selectedChat.id,
          }),
          data: JSON.stringify({
            action: 'speak',
            body: outgoingMessage,
            kind: "text",
            status: "sent",
          })
        }
    
          socket.send(JSON.stringify(msg))
          textFieldRef.current.blur()
          textFieldRef.current.value = ""
          setOutgoingMessage("")
    }
    
    return (
        <div className={styles.messageBox}>
                <div className={styles.messageStream} ref={messagesStreamRef}>
                    {/* <div className="message-right">
                        <div className="single-message-box-right">
                            <p className="message">hello how are you</p>
                            
                            </div>
                    </div>

                    <div className="message-left">
                        <div className="single-message-box-left">
                            <p className="message">good and you? 😁</p>
                            
                            </div>
                    </div>

                    <div className="message-right">
                        <div className='individual-message-box'>
                            
                        <div className="single-message-box-right">
                            <p className="message">great!! 🎉🎉🎉</p>
                            
                            </div>
                            <p>Aharon Seidman</p>
                            </div>
                    </div> */}
                    {messages.map((message, key)=>{ //its item, index for some reason not key value
            return (
            <div className={message.user_uuid === Cookies.get('uuid')?  styles.messageRight: styles.messageLeft} key={key}>
                <div className={message.user_uuid === Cookies.get('uuid')? styles.individualMessageBoxRight: styles.individualMessageBoxLeft}>
                <div className={message.user_uuid === Cookies.get('uuid')? styles.singleMessageBoxRight : styles.singleMessageBoxLeft}>
                    <p className={styles.message}> {message.body}</p>
                </div>
                <p>{message.user_uuid === Cookies.get('uuid')? "" : ((message.first_name ? message.first_name : "") + " " + (message.last_name ? message.last_name : ""))}</p>
                </div>
            </div>
            )
        }
        )}
                    </div>
                <div className={styles.inputbox}> 
                    <input type="text" className={styles.input} onChange={handleMessageInputChange} ref={textFieldRef} onKeyDown={handleEnter}/>
                    <div className={styles.sendButton} onClick={sendMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path fill="#DAEFFB" d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/>
                        </svg>
                    </div>
                </div>

            </div>
    )
}