const mongoose = require("mongoose");



const contact_schema = new mongoose.Schema({
  
    email : {
        type : String,
        required : true,
        unique:true
       
    },
    feedback : {
        type : String,
        required : true
    }
})

const Contact = mongoose.model("Contact", contact_schema);

module.exports = Contact;