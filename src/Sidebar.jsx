import ChatSidebar from "./ChatSidebar"
export default function Sidebar({socket, chats,setSelectedChat, selectedChat}) {
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

         <div className="onlineUsersList">
            <div className="user">
              <div className="image"></div>
              <p className="name"> Name</p>
            </div>
            <div className="user">
              <div className="image"></div>
              <p className="name"> Name</p>
            
            </div>
        </div>

        <div className="sidebar">
          <div className="add-new-chat-box">
            <div className="add-new-chat">+</div></div>
       
        
        
        <div className="chat" onClick={handleNewChat}/>
        <ChatSidebar {...{setSelectedChat, chats, selectedChat}} />
          
    </div>
    </div>

    )
}
