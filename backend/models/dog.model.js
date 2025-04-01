const mongoose=require('mongoose');

const dogSchema=new mongoose.Schema({
  image:{
    type:[String],
    required:true
  },
  name:{
    type:String,
    required:true,
    min:3,
  },
  age:{
    type:Number,
    required:true,
  },
  gender:{
    type:String,
    enum:["male", "female"],
    required:true
  },
  size:{
    type:String,
    enum:["small", "medium", "large"],
    required:true
  },
  qualities:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  history:{
    type:String,
    required:true
  },
  specificNeeds:{
    type:String,
    required:true
  }
});

const DogModel=mongoose.model("dogs", dogSchema);
module.exports={DogModel};