import mongoose from "mongoose"


const ToDoAppSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  tasks: [{title:String,done:Boolean}]
});



const users = mongoose.model('user', ToDoAppSchema, "users");

export default users;