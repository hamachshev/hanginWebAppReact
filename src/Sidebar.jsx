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
        {chats.map((chat)=>{
          return (
            <div className={`chat ${selectedChat === chat ? "selectedChat" :""}`} // suggested by chat gpt. i was doing  // if(selectedChatRef.current != null){
              // selectedChatRef.current.classList.toggle("selectedChat")
              // }
              // selectedChatRef.current = e.target
              // selectedChatRef.current.classList.toggle("selectedChat") and had useref prompt was what i was doing and "is this bad practice"
            key={chat} onClick={(e)=> { 
              setSelectedChat(chat)
            }

            }>{chat}</div>
          )
        })}
        <div className="chat">
                    <div class="circle-container">
              <div class="circle">
                <img src="https://picsum.photos/200" />
                <p>Circle 1</p>
              </div>
              <div class="circle">
                <img src="https://picsum.photos/200" />
                <p>Circle 1</p>
              </div>
              <div class="circle">
                <img src="https://picsum.photos/200" />
                <p>Circle 1</p>
              </div>
              <div class="circle">
                <img src="https://picsum.photos/200" />
                <p>Circle 1</p>
              </div>


              <p className="chatTitle">Swimming</p>
              
            </div>

          </div>
    </div>
    </div>

    )
}
