require('dotenv').config();
const express = require('express');
//const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const Router = require("./src/routes/router")
const cookieParser=require('cookie-parser');
const mongoose = require('mongoose');
const dockerStart=require('./src/services/dockerStart');
const jwt=require('jsonwebtoken');
const createNetwork=require('./src/services/createNetwork');
const createNginxCon=require('./src/services/createNginxCon');
const User=require('./src/models/user');
const startTreafikCon=require('./src/services/startTreafikCon');

const {exec}=require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
//dockerStart();
const fun=async()=>{
    await dockerStart();
    // await createNetwork();
    // Nginx=await createNginxCon();
    await startTreafikCon();
    await execPromise(`cd ${process.env.ROOT_PATH}/server/treafik && docker compose -f docker-compose.nginx.yml up -d`);
    console.log(`treafik container created !!`);
}
fun();


mongoose.connect(`mongodb://localhost:${process.env.MONGO_PORT}`).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
})

const app = express();
const cors=require('cors')
const redis=require('redis');
const redisClient=redis.createClient({ url:`redis://localhost:${process.env.REDIS_PORT}`});

redisClient.connect();

redisClient.on('connect',()=>{
  console.log(`redis id connected :) `);
})

redisClient.on('error',(err)=>{
  console.log(`redis eror ${err}`);
})

// Define your allowed origins
const allowedOrigins = ['http://127.0.0.1:3001', 'http://localhost:5173'];

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

const session = require('express-session');
app.use(session({
  secret: 'my-secret',             // Key used to sign the session ID cookie
  resave: false,                   // Don't resave sessions if they haven't been modified
  saveUninitialized: true,         // Save sessions even if they haven't been initialized
   cookie: { secure: false}       // Secure should be set to true if you're using HTTPS
}));

// const passport = require('passport');
// const GitHubStrategy = require('passport-github').Strategy;
// passport.initialize();
// passport.session();
// passport.use(new GitHubStrategy({
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL: "http://localhost:8080/auth/github/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//   return cb(null, profile);
// }
// ));

app.get('/auth/github',(req,res)=>{
  console.log('Github Auth');
  const redirect_uri = 'http://localhost:3000/auth/github/callback';
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=repo`;
  res.redirect(githubAuthUrl);
})

app.get('/auth/github/callback',async (req,res)=>{
  console.log('Github Auth Callback');
  const { code } = req.query;
  try{
    let tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
    })});
    tokenResponse = await tokenResponse.json();
    const accessToken = tokenResponse.access_token;
    console.log(tokenResponse);
    console.log(accessToken);
    req.session.accessToken = accessToken;
    let userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`
      }
    });
    userResponse = await userResponse.json();
    console.log(userResponse);
    const userName = userResponse.login;
    console.log(userName);
    const userDetails= await User.findOne({userName:userName});
    payload=jwt.sign({userId:userDetails.userId},process.env.JWT_SECRET);
    res.cookie('sessionToken',payload,{
      //httpOnly:true,
      secure:true,
      sameSite:'none',
      maxAge: 1000*60*60*24*7,
      path:'/'
  })
    res.redirect('http://localhost:5173');
  }
  catch(err){
    console.log(err);
  }
})
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
  console.log(req.session);
    console.log('Hello World');
    res.json({ message: 'Hello World' });
});

//Listen and serve
app.listen(port, () => {
console.log(`Server listening at port:${port}`)
});
