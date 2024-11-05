export default function UserBubble({user}){
    return (
        <div className="circle">
            <img src="https://picsum.photos/200" />
            <p>{user.first_name + " " + user.last_name}</p>
        </div>
    )
}