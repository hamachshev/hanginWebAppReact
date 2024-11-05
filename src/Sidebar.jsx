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
      <div className="sidebar-container">

         <OnlineContactsList {...{onlineContacts}}/>

        <div className="sidebar">
          <div className="add-new-chat-box">
            <div className="add-new-chat">+</div></div>
       
        
        
        <div className="chat" onClick={handleNewChat}/>
        <ChatSidebar {...{setSelectedChat, chats, selectedChat}} />
          
    </div>
    </div>

    )
}
