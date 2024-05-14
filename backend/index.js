const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Routes = require("./routes/routes");


//to use bodyparser in our app we write this commmand.
//body parser is used to get data from our frontend to our backend.
//nodemon is used to run our backend automatically when we update our file or make some changes.(npm run dev) dev is dependency
//Routes is used to create routes in another folder and use those routes here in this folder.
app.use(Routes);

//now I will be connecting my database and backend
mongoose.connect("mongodb://127.0.0.1:27017/AppDB")
.then(()=>{
    app.listen(5000, (req,res)=>{
        try{
            console.log("server is live at port : 5000");
        }catch(err){
            console.log("some error occured on listening of port", err);
        }
    })
}).catch((err)=>{
    console.log("error occured while connectiong to data base : \n",err.message);
})




