 const express = require('express')
 const env = require('dotenv')
 require('dotenv').config();
 const mongoose = require('mongoose')
 const bodyParser = require('body-parser')

//routes
const userRoutes =require('./routes/user')


const app = express()



mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
})
.then(()=>console.log('db connected'))




app.use(express.json())
//app.use(bodyParser())
app.use('/api',userRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})