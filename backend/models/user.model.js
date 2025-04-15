const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
  image:{
    type:[String],
  },
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:["user", "shelter", "admin"],
    default:"user"
  }
})

const userModel=mongoose.model('user', userSchema)

module.exports=userModel