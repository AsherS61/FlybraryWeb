const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require('cors')

dotenv.config({ path: "./.env" });

connectDB();

const auth = require('./routes/auth.js'); 
const books = require('./routes/books.js');
const transactions = require('./routes/transactions.js');
const cronRoutes = require("./routes/cron.js");


const app = express();

//body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: [
    'https://flybrary-web-auto-frontend.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));


//Cookie parser
app.use(cookieParser());

//Mount routers
app.use("/api/v1/books", books);
app.use("/api/v1/auth", auth); 
app.use("/api/v1/transactions", transactions);
app.use("/api/cron", cronRoutes);


app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});

module.exports = app;