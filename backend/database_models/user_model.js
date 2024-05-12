const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/AppDB");

const user_schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

const User = mongoose.model("User", user_schema);

module.exports = User;