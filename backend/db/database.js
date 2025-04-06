const mongoose=require('mongoose');
let url=process.env.MONGOURL;

const connection=mongoose.connect(url).then(()=>{
    console.log("Successfully connected to mongoDB")
}).catch((err)=>{
    console.log(err)
})

module.exports=connection