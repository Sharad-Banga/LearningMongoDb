
import mongoose, { model } from 'mongoose';

const Schema = mongoose.Schema;

//we have two collection , user and todo
//user contains all the user that sign up
//todo contains todos 

//this is schema of user db
const User = new Schema({
  email : String,
  password : String,
  name : String
})

//this is schema of todo db
const todo = new Schema({
  title : String,
  done : Boolean,
  userId : ObjectId // user id of person(already present in user db) whose todo it is
})

//creating models 
const UserModel = mongoose.model('users',User);
const TodoModel = mongoose.model('todos',todo);

model.exports = {
  UserModel : UserModel,
  TodoModel : TodoModel
}