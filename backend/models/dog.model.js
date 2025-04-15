const mongoose=require('mongoose');

const dogSchema=new mongoose.Schema({
  images:{
    type:[String],
    required:true
  },
  name:{
    type:String,
    required:true,
    min:3,
  },
  breed:{
    type:String,
    required:true
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
  specialNeeds:{
    type:String,
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  }
});

const DogModel=mongoose.model("dogs", dogSchema);
module.exports=DogModel