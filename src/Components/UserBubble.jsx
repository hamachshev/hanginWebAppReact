import styles from "../Css/UserBubble.module.css"
export default function UserBubble({user}){
    return (
        <div className={styles.circle}>
            
            <img src={`${user.profile_pic ? user.profile_pic : '/images/profile-pic-generic.svg'}` } />
            
            <p>{user.first_name + " " + user.last_name}</p>
        </div>
    )
}