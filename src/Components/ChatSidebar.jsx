import styles from "../Css/ChatSidebar.module.css"
import UserBubble from "./UserBubble"

export default function ChatSidebar({chats, selectedChat, setSelectedChat}) {
    return (
        <>
        {chats.map((chat)=>{
            
            return (
                          <div className={`${styles.chat} ${selectedChat? (selectedChat.id === chat.id ? styles.selectedChat : ""): ""}`}
                          key={chat.id} onClick={(e)=> { 
                            setSelectedChat(chat)
                          }
                
                          }>
                        <div className={styles.circleContainer}>
                            
                            {chat.users.map((user)=>{
                                return (
                                    <UserBubble 
                                    key={user.uuid}
                                    {...{user}}
                                    />
                                )
                            })}
                        
                        
                        
                        <p className={styles.chatTitle}>{chat.name}</p>
                        </div>
                    </div>
            )
          })}
          </>
    )
}

 // suggested by chat gpt. i was doing  // if(selectedChatRef.current != null){
            // selectedChatRef.current.classList.toggle("selectedChat")
            // }
            // selectedChatRef.current = e.target
            // selectedChatRef.current.classList.toggle("selectedChat") and had useref prompt was what i was doing and "is this bad practice"

 