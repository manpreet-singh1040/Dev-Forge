const express = require('express');
//const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const cors=require('cors')
const allowedOrigins = ['', 'http://localhost:3000'];

// Configure the CORS middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({ extended: true})
);
const port=process.env.PORT || 3000;
app.get('/', (req, res) => {
    console.log('Hello World');
    res.json({ message: 'Hello World from 3000' });
});

//Listen and serve
app.listen(port, () => {
console.log(`Server listening at port:${port}`)
});