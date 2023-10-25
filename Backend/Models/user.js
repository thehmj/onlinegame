const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
Name:{
    type: String,
    required: true,
},
email:{
    type: String,
    required: true,
    unique: true
} ,
password:{
    type: String,
    required: true,
}


})

const Users = new mongoose.model("USER",userSchema);
module.exports = Users;