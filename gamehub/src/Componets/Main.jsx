import { useEffect, useState } from 'react';
import '../Styles/Home.css';
// import { io } from "socket.io-client";


const Main = ({ setvisible, room, socket }) => {

    const [chance, setchance] = useState("X");
    const [waiting, setwating] = useState(true);
    const [opponent, setopponent] = useState("");
    const [board, setboard] = useState(true);
    const [userval, setuserval] = useState("");
    const [whowin, setwhowin] = useState("");
    const [count, setcount] = useState(0);
    const [textmessage, settextmessage] = useState("");
    const [message, SetMessages] = useState([]);


    const Name = localStorage.getItem("Name");
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const [run, setrun] = useState(false);
    const [val1, setval1] = useState("");
    const [val2, setval2] = useState("");
    const [val3, setval3] = useState("");
    const [val4, setval4] = useState("");
    const [val5, setval5] = useState("");
    const [val6, setval6] = useState("");
    const [val7, setval7] = useState("");
    const [val8, setval8] = useState("");
    const [val9, setval9] = useState("");

    useEffect(() => {
        if (run) {
            winning();
        }
        console.log(userval, "rrrrrrrrrrr");
        setrun(true);
        // eslint-disable-next-line
    }, [val1, val2, val3, val4, val5, val6, val7, val8, val9]);

    const winning = () => {
        if (val1 !== "" && val1 === val2 && val2 === val3) {
            return alert(whowin + " win") & setvisible(true);
        }
        if (val4 !== "" && val4 === val5 && val5 === val6) {
            return alert(whowin + " win") & setvisible(true);

        }
        if (val7 !== "" && val7 === val8 && val8 === val9) {
            return alert(whowin + " win") & setvisible(true);

        }
        if (val1 !== "" && val1 === val4 && val4 === val7) {
            return alert(whowin + " win") & setvisible(true);

        }
        if (val2 !== "" && val2 === val5 && val5 === val8) {
            return alert(whowin + " win") & setvisible(true);

        }
        if (val3 !== "" && val3 === val6 && val6 === val9) {
            return alert(whowin + " win") & setvisible(true);

        }
        if (val1 !== "" && val1 === val5 && val5 === val9) {
            return alert(whowin + " win") & setvisible(true);

        }
        if (val3 !== "" && val3 === val5 && val5 === val7) {
            return alert(whowin + " win") & setvisible(true);

        } if (count === 8) {
            return alert("Match Draw") & setvisible(true);
        }
        else {
            setcount(count + 1);
        }
    }


    const sendMessage = (val) => {
        const data = {
            val: val,
            key: chance,
            user: id,
            Name: Name
        }
        socket.emit("send_message", { data, room });
    };

    const sendchat = () => {
        const data = {
            user: id,
            Name: Name,
            message: textmessage
        }
        socket.emit("send_chat", { data, room });
        return settextmessage("");
    }
    socket.on("receive_chat", (res) => {
        const { data } = res;
        console.log(data);
       return SetMessages([...message,data]);
    });
    socket.on('disconnect', () => {
        alert("user disconnected");
        setvisible(true);
    });

    socket.on('room_members', (data) => {
        console.log("chnage");
        if (data?.output?.length === 2) {
            setwating(false);
            console.log(data.output);
            data?.output?.forEach((element, index) => {
                if (element !== id) {
                    setopponent(element);
                } else {
                    if (index === 0) {
                        setuserval("X");
                        setboard(false);

                    }
                    else {
                        setuserval("O");
                    }
                }
            })
        } else if (data.output.length === 0) {
            alert("room is already full , Please Join another room",);
            return setvisible(true);
        }
        else if (data.output.length === 1) {
            setuserval("X");
        }
    });
 
    socket.on("receive_message", (res) => {
        const { data } = res;
        // console.log(id,chance,board,userval);
        setchance(() => data.key === "X" ? "O" : "X");
        setboard(() => id === data.user);
        console.log(id, data.user);
        setwhowin(data.Name);
        if (data.val === "val1") {
            setval1(data.key);
        }
        else if (data.val === "val2") {
            setval2(data.key);
        } else if (data.val === "val3") {
            setval3(data.key);
        } else if (data.val === "val4") {
            setval4(data.key);
        } else if (data.val === "val5") {
            setval5(data.key);
        } else if (data.val === "val6") {
            setval6(data.key);
        } else if (data.val === "val7") {
            setval7(data.key);
        } else if (data.val === "val8") {
            setval8(data.key);
        } else if (data.val === "val9") {
            setval9(data.key);
        }
    });


    // useEffect(() => {
    
      

       
     
    //     // eslint-disable-next-line
    // }, [socket]);

    return (
        <div className='main2'>
            <div className='center2'>
                <div style={{ display: "flex", width: "100%", position: "relative" }}>
                    <p id="userCont">You : {Name} <span id="user"></span></p>
                    <p style={{ position: "absolute", right: 0 }} id="oppNameCont">Opponent : {waiting ? "waiting..." : opponent}<span id="oppName"></span></p>

                </div>
                <br />
                <p id="valueCont">You are playing in {room} as {userval}<span id="value"></span></p>
                <br />
                <div className="center">

                    {!waiting && <p id="whosTurn">{chance}'s Turn</p>}

                    {waiting ?
                        <h2>waiting for opponent...</h2>
                        :
                        <div id="bigcont">
                            <div id="cont">
                                <button id="btn1" onClick={() => sendMessage("val1")} disabled={board ? true : (val1 !== "" ? true : false)} class="btn">{val1}</button>
                                <button id="btn2" onClick={() => sendMessage("val2")} disabled={board ? true : (val2 !== "" ? true : false)} class="btn">{val2}</button>
                                <button id="btn3" onClick={() => sendMessage("val3")} disabled={board ? true : (val3 !== "" ? true : false)} class="btn">{val3}</button>
                                <button id="btn4" onClick={() => sendMessage("val4")} disabled={board ? true : (val4 !== "" ? true : false)} class="btn">{val4}</button>
                                <button id="btn5" onClick={() => sendMessage("val5")} disabled={board ? true : (val5 !== "" ? true : false)} class="btn">{val5}</button>
                                <button id="btn6" onClick={() => sendMessage("val6")} disabled={board ? true : (val6 !== "" ? true : false)} class="btn">{val6}</button>
                                <button id="btn7" onClick={() => sendMessage("val7")} disabled={board ? true : (val7 !== "" ? true : false)} class="btn">{val7}</button>
                                <button id="btn8" onClick={() => sendMessage("val8")} disabled={board ? true : (val8 !== "" ? true : false)} class="btn">{val8}</button>
                                <button id="btn9" onClick={() => sendMessage("val9")} disabled={board ? true : (val9 !== "" ? true : false)} class="btn">{val9}</button>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className='chatpannel'>
                {message.length===0 && <div className='center placeholder'> Start Chatting ◔</div> }
                <div className='chatbox'>
                    <div className='messagebox'>
                        {       
                            message.map((e) => {
                                console.log(e.user,id,e.user!=id?"left":"right" );
                                return (
                                  
                                    <div className='messagecontainer' >
                                        <div className='messages' style={{ textAlign: e.user!=id ?"left":"right" }}>
                                            {e?.message}
                                        </div>
                                    </div>
                                    
                                )
                            })
                        }

                    </div>
                    
                </div>
              {!waiting &&  <div className='messageinput'>
                    <input className='textmsg' placeholder='message..' value={textmessage} onChange={(e) => settextmessage(e.target.value)} type="text" />
                    <button className='button1'  onClick={sendchat}>Send</button>
                </div>}
            </div>

        </div>
    )
}

export default Main 