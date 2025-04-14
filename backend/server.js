const express=require('express')
const app=express()
require("dotenv").config();
const Port=process.env.PORT
let connection=require('./db/database.js');
const DogRoute = require('./routes/dog.route.js')
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


app.use(express.json())

app.get('/ping',(req,res)=>{
    console.log(req)
    try {
        res.send("Pong")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.use('/dogs', DogRoute);

app.listen(Port,async()=>{
    try{
        await connection;
        console.log(`app is listening on http://localhost:${Port}`)
    }
    catch(error){
        console.log(error)
    }
})