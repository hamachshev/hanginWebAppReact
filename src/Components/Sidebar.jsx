import styles from "../Css/Sidebar.module.css"
import ChatSidebar from "./ChatSidebar"
import OnlineContactsList from "./OnlineContactsList"
export default function Sidebar({socket, chats,setSelectedChat, selectedChat, onlineContacts}) {
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
    return (
      <div className={styles.sidebarContainer}>

         <OnlineContactsList {...{onlineContacts}}/>

        <div className={styles.sidebar}>
          <div className={styles.addNewChatBox}>
            <div className={styles.addNewChat}>+</div></div>
       
        
        
        <div className={styles.chat} onClick={handleNewChat}/>
        <ChatSidebar {...{setSelectedChat, chats, selectedChat}} />
          
    </div>
    </div>

    )
}
