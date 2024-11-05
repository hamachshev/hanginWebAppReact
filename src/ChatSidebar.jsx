import UserBubble from "./UserBubble"

export default function ChatSidebar({chats, selectedChat, setSelectedChat}) {
    return (
        <>
        {chats.map((chat)=>{
            console.log(chat)
            return (
                          <div className={`chat ${selectedChat? (selectedChat.id === chat.id ? "selectedChat" : ""): ""}`}
                          key={chat.id} onClick={(e)=> { 
                            setSelectedChat(chat)
                          }
                
                          }>
                        <div className="circle-container">
                            
                            {chat.users.map((user)=>{
                                return (
                                    <UserBubble 
                                    key={user.uuid}
                                    {...{user}}
                                    />
                                )
                            })}
                        
                        
                        
                        <p className="chatTitle">{chat.id}</p>
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

 