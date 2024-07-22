const express = require("express");
const User = require("../database_models/user_model.js");
const jwt = require("jsonwebtoken");

const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const data = await User.create({
            name : name,
            email : email,
            password : password
        })
        res.send(data);
    }catch(err){
        console.log("some error occured while logging in :\n",err.message);
    }
}

const login = async(req,res)=>{
    const {name,email,password} = req.body;
    const Email = email.toLowerCase();
    //now I will search in database for this email and password;
    try{
        const data = await User.findOne({
            name : name,
            email : email,
            password : password,
        });
        if(data==null){
            //no such user exists in our database;
            console.log("user not found");
            res.sendStatus(404);

        }else{
            const token = await jwt.sign({ _id: data._id }, process.env.SECRET_KEY, {
                expiresIn: "1hr",
              });
            //we found the user in database;
            console.log("user Found");
            console.log(token);
            res.json({success : true , message : token});
        }
    }catch(err){
        console.log("some error occured while taking data from database : ",err.message);
        res.sendStatus(404);
    }
}

const loggedIn = async(req, res)=>{
    const user = req.user;
    const data = await User.find({_id : user._id});
    console.log(data);
    res.json({success : true, message : data});
}

module.exports = {registerUser, login, loggedIn};