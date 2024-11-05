import styles from "../Css/UserBubble.module.css"
export default function UserBubble({user}){
    return (
        <div className={styles.circle}>
            <img src="https://picsum.photos/200" />
            <p>{user.first_name + " " + user.last_name}</p>
        </div>
    )
}