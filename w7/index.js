import express from 'express';
import { UserModel, TodoModel } from './db.js';
const app = express();
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_SECRET = "sharad12345";
app.use(express.json());

mongoose.connect("mongodb+srv://sharad_banga:sharad@cluster0.8vv4o.mongodb.net/todo-app-database");

app.post('/signup',async (req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email : email,
    password : password,
    name : name
  })

  res.send({
    message : "you are signed up"
  })

})


app.post('/signin',async (req,res)=>{
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email : email,
    password : password
  })

  console.log(user);
  

  if(user){
    const token = jwt.sign({id :user._id} ,JWT_SECRET);
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