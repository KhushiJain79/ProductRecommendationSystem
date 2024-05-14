const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const user_model = require("../database_models/user_model");
const routes = express.Router();
app.use(express.json());
routes.use(bodyParser.json());//this ensures routes to get data from frotend of our website. req.body becomes javascript object.
//here we are going to import mongodb model of user


routes.get("/", (req,res)=>{
    res.send("hello");
})

routes.post("/sign-in", async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const data = await user_model.create({
            name : name,
            email : email,
            password : password
        })
        res.send(data);
    }catch(err){
        console.log("some error occured while logging in :\n",err.message);
    }
});

routes.post("/login", async(req,res)=>{
    const {name,email,password} = req.body;

    //now I will search in database for this email and password;
    try{
        const data = await user_model.findOne({
            name : name,
            email : email,
            password : password,
        });
        console.log(data);
        if(data==null){
            //no such user exists in our database;
            console.log("user not found");
            res.sendStatus(404);

        }else{
            //we found the user in database;
            console.log("user Found");
            res.sendStatus(200);
        }
    }catch(err){
        console.log("some error occured while taking data from database : ",err.message);
        res.sendStatus(404);
    }
})

module.exports = routes;