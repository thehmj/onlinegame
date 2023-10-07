const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const cors = require('cors');
const port = process.env.PORT || 5000;
require('./Database/connection');
const Rooms = require('./Models/room');
const { channel } = require('diagnostics_channel');

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
        const output = await roomupload(data);
        var chance = "";
        console.log(output);
        if (output.length !== 0) {
            socket.join(data.room);

            if(output.length === 1) { 
                chance = "X"
             }else{ 
                chance = "O"
             }
            io.to(data.room).emit("room_members", { output });
        } else {
            io.to(socket.id).emit("room_members", { output });
        }
    });

    socket.on("send_message", (data) => {
        io.to(data.room).emit("receive_message", data);
    });

    socket.on('disconnect', () => {
        console.log(`Client with socket ID ${socket.id} disconnected.`);
    });
});

app.get('/', (req, res) => {
    res.send('Game Backend');
})


async function roomupload(data) {
    try {
        const a = await Rooms.findOne({ roomName: data.room });
        if (!a) {
            const { username } = data;
            const b = await new Rooms({
                roomName: data.room,
                users: [username]
            })
            await b.save();
            return [username];
        }
        else {
            if (a.users.length == 1) {
                await a.users.push(data.username);
                
                await a.save();
                return a.users;
            }
            return [];
        }
    } catch (error) {
        console.log(error.message);
    }
}

server.listen(port, () => {
    console.log('server is running....');
})
