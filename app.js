const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("./config/dbconnect");
const authRoute = require("./routes/authRoute")
const userRoute =  require("./routes/userRoute")

const app = express();
app.use(express.json());

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// Server
app.listen(process.env.PORT || 8000, ()=> console.log(`Server is running on ${process.env.PORT }`) ); 