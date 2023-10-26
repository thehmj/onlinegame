import { io } from "socket.io-client";
import Home from '../Componets/Home';
import Main from '../Componets/Main';
import { useState,useEffect } from 'react';

const Landing =({url}) => {
  console.log("a",window.innerHeight /window.innerWidth);

  const getio =async()=>{
    const sockt = await io.connect(url);
    setsocket(sockt);
  }
  useEffect(()=>{
   getio();
  },[])
  const [visible, setvisible] = useState(true);
  const [room, setroom] = useState("");
  const [socket, setsocket] = useState();

   
  return (
    visible ? <Home visible={visible} setvisible={setvisible} setroom={setroom} room={room} socket={socket}/>
      :
      <Main  setvisible={setvisible} room={room} socket={socket} />

  )
}

export default Landing;