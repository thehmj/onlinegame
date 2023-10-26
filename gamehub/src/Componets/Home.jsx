import { useEffect, useState } from 'react';
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ visible, setvisible, room, setroom, socket }) => {
    const Name = localStorage.getItem("Name");
    const token = localStorage.getItem("token");
    const [greet,setgreet] = useState("");

    const navigate = useNavigate();
    const joinRoom = () => {
        if (room !== "") {

            socket.emit("join_room", { room, token });
            setvisible(false);
        } else {
            alert("enter room");
        }
    };
    function gettime() {
        const myDate = new Date();
        const hrs = myDate.getHours();
        if (hrs < 5)
        setgreet('Good Night 🌃');
        else if (hrs >= 5 && hrs <= 12)
        setgreet('Good Morning 🌅');
        else if (hrs >= 12 && hrs <= 17)
        setgreet('Good Afternoon ☀️');
        else if (hrs >= 17 && hrs <= 24)
        setgreet('Good Evening 🌙');
    }

    function generateRoomCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength = 6;
        let roomCode = '';

        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            roomCode += characters.charAt(randomIndex);
        }

        return setroom(roomCode);
    }
useEffect(()=>{
gettime();

},[])
    return (
        <div className='center'>
            <h1>Tic-Tac-Toe</h1>

            <div >
                <p style={{ fontSize: "1.2rem" }} id="enterName"> {greet} {Name.split(" ")[0]} </p>
                <p style={{ fontSize: "1.2rem" }} id="enterName"> Join a room to play </p>


                <input type="text" placeholder="Generate room code" value={room} onChange={(e) => setroom(e.target.value)} />

            </div>

            <span className="buttongap">
                <button className='button1 msgsendbutton' onClick={joinRoom}>Join Room </button>
                <button className='button1 msgsendbutton' onClick={generateRoomCode}>Generate Room </button>
            </span>
            <button className='logout'
                onClick={() => localStorage.removeItem("Name") & localStorage.removeItem("token") & navigate('/signin')}
            >Logout 👋</button>

        </div>
    )
}
export default Home;