const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
roomName:{
    type: String,
    required: true,
    unique: true
}, 

users:[
    {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'USER'   
    }
],
Game:[{
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    },
    position:{
        type:String
    }
}],
messages:[
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USER'
        },
        text:{
            type:String
        }
    }
],
expired:{
    type:Boolean,
    default:false
}

})

const ROOMS = new mongoose.model("ROOM",roomSchema);
module.exports = ROOMS;