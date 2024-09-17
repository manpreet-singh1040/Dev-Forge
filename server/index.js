require('dotenv').config();
const express = require('express');
//const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const Router = require("./src/routes/router")
const cookieParser=require('cookie-parser');
const mongoose = require('mongoose');
const dockerStart=require('./src/services/dockerStart');

dockerStart();




mongoose.connect(`mongodb://localhost:${process.env.MONGO_PORT}`).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
})

const app = express();

const cors=require('cors')

// Define your allowed origins
const allowedOrigins = ['', 'http://localhost:3000'];

// Configure the CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  credentials:true
}));


// express server instance
const port = process.env.PORT || 8080;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({ extended: true})
);

//setup router 
app.use("/", Router);
app.get('/', (req, res) => {
    console.log('Hello World');
    res.json({ message: 'Hello World' });
});

//Listen and serve
app.listen(port, () => {
console.log(`Server listening at port:${port}`)
});
