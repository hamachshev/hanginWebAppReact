import { useState } from "react"
import styles from "../Css/Sidebar.module.css"
import ChatSidebar from "./ChatSidebar"
import OnlineContactsList from "./OnlineContactsList"
import { useOutsideClick } from "outsideclick-react";
export default function Sidebar({socket, chats,setSelectedChat, selectedChat, onlineContacts}) {
  
  const [editing, setEditing] = useState(false)
  const [chatName, setChatName] = useState(''); 
  const handleInputChange = (event) => {
    setChatName(event.target.value); 
  };

  const handleEnterSubmit = (e)=>{
    if(e.key === 'Enter'){
      handleNewChat(e)
      setEditing(false)
    }
}

  const ref = useOutsideClick(()=>{
    setEditing(false)
    
    console.log("outside.....")
})
  const handleEditNewChat = (e) => {
    setEditing(true)
    // handleNewChat(e)
  }
  const handleNewChat = (e) => {
        const msg = {
          
            command: "message",
            identifier: JSON.stringify({
              channel: 'ChatsChannel'
          }),
            "data": JSON.stringify({
              action: 'createChat',
              name: chatName
          })
            
        }
        
        socket.send(JSON.stringify(msg))
      }
    return (
      <div className={styles.sidebarContainer}>

         <OnlineContactsList {...{onlineContacts}}/>

        <div className={styles.sidebar}>
          <div className={styles.addNewChatBox}>
            <div className={styles.addNewChat}>+</div></div>
       
        
        
        <div className={`${styles.chat} ${styles.newChat}`} onClick={handleEditNewChat} ref={ref}>
          {!editing &&  <p>New Chat</p>}
          {editing && <input type="text" autoFocus onChange={handleInputChange} onKeyDown={handleEnterSubmit} placeholder="Enter chat name"/>}
         
          </div>
        <ChatSidebar {...{setSelectedChat, chats, selectedChat}} />
          
    </div>
    </div>

    )
}
