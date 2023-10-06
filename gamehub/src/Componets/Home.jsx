import '../Styles/Home.css';
import {useNavigate} from 'react-router-dom';

const Home = ({visible,setvisible,room,setroom,socket}) => {
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const joinRoom = () => {
       if (room !=="") {

          socket.emit("join_room", {room,username});
           setvisible(false);
        }else{
            alert("enter room");
        }
    };

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

    return (
        <div className='center'>
            <h1>Tic-Tac-Toe</h1>
            
           <div >
                <p style={{ fontSize: "1.2rem" }} id="enterName"> Hello! {username} </p>
                <p style={{ fontSize: "1.2rem" }} id="enterName"> Join a room to play </p>

                   
                <input type="text" placeholder="Generate room code" value={room} onChange={(e)=>setroom(e.target.value)} />
                
            </div>
           
            <span className="buttongap">
            <button onClick={joinRoom}>Join Room</button>
            <button onClick={generateRoomCode}>Generate Room</button>
            </span>
            <button className='logout'
            onClick={()=>localStorage.removeItem("username") & navigate('/signin')}
            >Logout</button>
           
        </div>
    )
}
export default Home;