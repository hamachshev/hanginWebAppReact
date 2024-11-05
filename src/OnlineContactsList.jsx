export default function OnlineContactsList({onlineContacts}){
    return (
        
        <div className="onlineUsersList">
            {onlineContacts.map((contact)=>{
                return (
                   
            <div className="user" key={contact.uuid}>
              <div className="image"></div>
              <p className="name"> {contact.first_name + " " + contact.last_name}</p>
            </div>
            
           
                )
            })}
        </div>
    )
}