import styles from "../Css/OnlineContactsList.module.css"
import UserBubble from "./UserBubble"
export default function OnlineContactsList({onlineContacts}){
    return (
        
        <div className={styles.onlineUsersList}>
            {onlineContacts.map((user)=>{
                return (
                   
            // <div className="user" key={contact.uuid}>
            //   {/* <div className="image"></div> */}
            //   <img className="image" src="https://picsum.photos/200" />
            //   <p className="name"> {contact.first_name + " " + contact.last_name}</p>
            // </div>

            <div className={styles.circleContainer}>
                            
                            
                            
                                    <UserBubble 
                                    key={user.uuid}
                                    {...{user}}
                                    />

                                    
                                
                        </div>
            
           
                )
            })}
        </div>
    )
}