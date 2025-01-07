import express from 'express';
import { UserModel, TodoModel } from './db';

const jwt = require("jsonwebtoken");

const JWT_SECRET = "sharad12345";
app.use(express.json());
const app = express();

app.post('/signup',async (req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.insert({
    email : email,
    password : password,
    name : name
  })

  res.send({
    message : "you are signed up"
  })

})


app.post('/signin',(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;

  const user = UserModel.findOne({
    email : email,
    password : password
  })

  if(user){
    const token = "";
    res.json({
      token : token
    })
  }
  else{
    res.status(403).json({
      message : "Incorrect password"
    })
  }

})


app.post('/todo',(req,res)=>{
  
})


app.post('/todos',(req,res)=>{
  
})

app.listen(3000);