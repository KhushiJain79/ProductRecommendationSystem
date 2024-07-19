const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");
const Routes = require("./routes/routes");
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
}));

// To parse incoming requests with JSON payloads
app.use(express.json());

// Using routes
app.use(Routes);

//using env file
dotenv.config();

//for cookies
app.use(cookieParser());;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/AppDB")
    .then(() => {
        console.log("MongoDB is Connected...");

        // Start the server
        app.listen(5000, () => {
            console.log("Server is live at port : 5000");
        });
    })
    .catch((err) => {
        console.error("Error connecting to database:", err.message);
    });
