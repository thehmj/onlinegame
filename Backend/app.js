const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 5000;
require('./Database/connection');
const Rooms = require('./Models/room');
const Users = require('./Models/user');

const { channel } = require('diagnostics_channel');
const { default: mongoose } = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "https://onlinegame-zrsv.onrender.com",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log("connected with ", socket.id);
    socket.on("join_room", async (data) => {
       const uid = await middleware(data.token);
        const output = await roomupload(data,uid);
        var chance = "";
        console.log(output);
        if (output.length !== 0) {
            socket.join(data.room);

            if (output.length === 1) {
                chance = "X"
            } else {
                chance = "O"
            }
            io.to(data.room).emit("room_members", { output });
        } else {
            io.to(socket.id).emit("room_members", { output });
        }
    });
    
    socket.on("send_chat", (data) => {
        messageupload(data);
        io.to(data.room).emit("receive_chat", data);
    });

    socket.on("send_message", (data) => {
        gameupload(data);
        io.to(data.room).emit("receive_message", data);
    });
  
    socket.on('disconnect', () => {
        console.log(`Client with socket ID ${socket.id} disconnected.`);
    });
});

app.get('/', (req, res) => {
    res.send('Game Backend');
})
async function messageupload(data) {
    try {
        const a = await Rooms.findOne({ roomName: data.room });
           await a.messages.push({
                user:data.data.user,
                text: data.data.message
            });
            await a.save();
    } catch (error) {
        console.log(error.message);
    }
}
async function gameupload(data) {
    try {
        const a = await Rooms.findOne({ roomName: data.room });
           await a.Game.push({
                user:data.data.user,
                postion: data.data.val
            });
            await a.save();
    } catch (error) {
        console.log(error.message);
    }
}
async function roomupload(data,uid) {
    try {
        const a = await Rooms.findOne({ roomName: data.room });
        if (!a) {
            const b = await new Rooms({
                roomName: data.room,
                users: [uid]
            })
            await b.save();
            return [uid];
        }
        else {
            if (a.users.length == 1) {
                await a.users.push(uid);

                await a.save();
                return a.users;
            }
            return [];
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function middleware(token) {
  try {
    const Jwt_key = process.env.JWT_KEY_VAL;
    console.log(Jwt_key);
    const isverifeduser = jwt.verify(token,Jwt_key);
    const isuserexist = await Users.findOne({_id:isverifeduser.id});
    console.log(isuserexist._id);
    if (isuserexist) {
        return isuserexist._id;
    }else{
        return "";
    }
  } catch (error) {
    console.log(error.message,error);
  }

}

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const isuserexist = await Users.findOne({ email: email });
        if (!isuserexist) {
            return res.status(404).send('user not exists');
        }
        const verify = await bcrypt.compare(password, isuserexist.password);
        if (verify) {
            const payload ={
                id: isuserexist._id,
                email:isuserexist.email,
                Name:isuserexist.Name
            }
            const Jwt_key = process.env.JWT_KEY_VAL;
            const token = jwt.sign(payload,Jwt_key);
            console.log(token);

            return res.status(200).json({token,Name: isuserexist.Name, id:isuserexist._id});
        }
        return res.status(401).send('not authorized');
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
})

app.post('/api/signup', async (req, res) => {
    try {
        const { Name, email, password } = req.body;
        const isuserexist = await Users.findOne({ email: email });
        if (isuserexist) {
            return res.status(401).send('user already exists');
        }
        const hashedpass = await bcrypt.hash(password,8);
        const a = await new  Users({
            Name, email, password:hashedpass
        })
        await a.save();
        return res.status(200).send('acc created');
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
})
server.listen(port, () => {
    console.log('server is running....');
})
