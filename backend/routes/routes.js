const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("../database_models/user_model.js");
const routes = express.Router();
app.use(express.json());
const {registerUser} = require("../Controllers/userController");
const {login} = require("../Controllers/userController");
const {loggedIn} = require("../Controllers/userController");

const {verifyToken} = require("../Middleware/VerifyToken.js");


routes.use(bodyParser.json());//this ensures routes to get data from frotend of our website. req.body becomes javascript object.
//here we are going to import mongodb model of user


routes.get("/", (req,res)=>{
    res.send("hello");
})

routes.post("/sign-in", registerUser);
routes.post("/login", login);
routes.post("/user/verify", verifyToken, loggedIn);
module.exports = routes;