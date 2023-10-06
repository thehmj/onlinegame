import { io } from "socket.io-client";
import Home from '../Componets/Home';
import Main from '../Componets/Main';
import { useState } from 'react';
const socket = io.connect("http://192.168.1.4:5000");
const Landing =() => {
  const [visible, setvisible] = useState(true);
  const [room, setroom] = useState("");
   
  return (
    visible ? <Home visible={visible} setvisible={setvisible} setroom={setroom} room={room} socket={socket}/>
      :
      <Main  setvisible={setvisible} room={room} socket={socket} />

  )
}

export default Landing;