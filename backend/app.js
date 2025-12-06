const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config({ path: "./.env" });

mongoose.connect(process.env.MONGO_URI)

const auth = require("./routes/auth.js");
const books = require("./routes/books.js");
const transactions = require("./routes/transactions.js");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: "https://flybrary-web-auto-frontend.vercel.app",
    credentials: true,
  })
);

app.use(cookieParser());

// Mount routes
app.use("/api/v1/books", books);
app.use("/api/v1/auth", auth);
app.use("/api/v1/transactions", transactions);

module.exports = app;
