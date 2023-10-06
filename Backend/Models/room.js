const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
roomName:{
    type: String,
    required: true,
    unique: true
}, 
users:[
    {
            type: String,
            ref: 'USER'   
    }
],
expired:{
    type:Boolean,
    default:false
}

})

const ROOMS = new mongoose.model("ROOM",roomSchema);
module.exports = ROOMS;