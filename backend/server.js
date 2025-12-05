const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require('cors')

dotenv.config({ path: "/process.env" });

connectDB();

// const books = require('./routes/books');
// const borrows = require('./routes/borrows');
// FIX: Import the auth router here
const auth = require('./routes/auth'); 


const app = express();

//body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors())

//Cookie parser
app.use(cookieParser());

//Mount routers
// app.use("/api/v1/books", books);
app.use("/api/v1/auth", auth); // Now 'auth' is defined
// app.use("/api/v1/borrows", borrows);

// Define PORT and start the server (assuming you had this at the end of the original file)
const PORT = process.env.PORT || 5000;

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);