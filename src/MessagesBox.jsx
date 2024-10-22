import {useState, useEffect, useRef} from 'react'
import Cookies from 'js-cookie';
export default function MessagesBox({selectedChat}){
    const [outgoingMessage, setOutgoingMessage] = useState('')
    const [messages, setMessages] = useState([])
    const handleMessageInputChange = (e) =>{
        setOutgoingMessage(e.target.value)
    }

    const socketRef = useRef(null)
    const textFieldRef = useRef(null)
    const messagesStreamRef = useRef(null)

    const handleEnter= (e)=>{
        if(e.key === 'Enter'){
            sendMessage()
        }
    }

    useEffect(()=>{
        if(socketRef.current){
            socketRef.current.close();
        }
        socketRef.current = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL + Cookies.get('auth_token')) 
        socketRef.current.onopen = function (e){
          console.log("connected to websocket")
          const msg = {
            command:'subscribe',
            identifier: JSON.stringify({
              channel: 'ChatChannel',
              id: selectedChat,
          }),}
    
          socketRef.current.send(JSON.stringify(msg))
        }
        socketRef.current.onmessage = function(e) {            
          const msg = JSON.parse(e.data);
          
          
          if (msg.type === "ping") {
              return;
          }
          console.log("FROM RAILS: ", msg);
          
          
          if (msg) {
            console.log("YOUVE GOT Mail!")
              console.log(msg)
              if(msg.message.messages){
                setMessages(msg.message.messages)
              }
              if(msg.message.message){
                setMessages((messages) => [...messages, msg.message.message]);
              }
          }


          
    }
        socketRef.current.onclose = function(e){
            console.log("unsubscribe to websocket")
            const msg = {
              command:'unsubscribe',
              identifier: JSON.stringify({
                channel: 'ChatChannel',
                id: selectedChat,
            }),}
      
            socketRef.current.send(JSON.stringify(msg))
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
              id: selectedChat,
          }),
          data: JSON.stringify({
            action: 'speak',
            body: outgoingMessage,
            kind: "text",
            status: "sent",
          })
        }
    
          socketRef.current.send(JSON.stringify(msg))
          textFieldRef.current.blur()
          textFieldRef.current.value = ""
          setOutgoingMessage("")
    }
    
    return (
        <div className="message-box">
                <div className="message-stream" ref={messagesStreamRef}>
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
                        <div className="single-message-box-right">
                            <p className="message">great!! 🎉🎉🎉</p>
                            
                            </div>
                    </div> */}
                    {messages.map((message, key)=>{ //its item, index for some reason not key value
            return (
            <div className={`message-${message.user_uuid === Cookies.get('uuid')? "right" : "left"}`} key={key}>
                <div className={`single-message-box-${message.user_uuid === Cookies.get('uuid')? "right" : "left"}`}>
                    <p className="message"> {message.body}</p>
                </div>
            </div>
            )
        }
        )}
                    </div>
                <div className="inputbox"> 
                    <input type="text" className="input" onChange={handleMessageInputChange} ref={textFieldRef} onKeyDown={handleEnter}/>
                    <div className="send-button" onClick={sendMessage}>
                    
                    </div>
                </div>

            </div>
    )
}