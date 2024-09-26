import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function Component1(){

    const location = useLocation();

 
useEffect(()=> {
  console.log(location)
  if(location == "/chats"){
  console.log("disconnecting to websocket")
      const msg = {
        command:'unsubscribe',
        identifier: JSON.stringify({
          channel: 'ChatChannel',
          id: id,
      }),}


      socket.send(JSON.stringify(msg))
    }
    
},[location])

}