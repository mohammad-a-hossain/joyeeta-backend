 const express = require('express')
 const env = require('dotenv')
 require('dotenv').config();
 const mongoose = require('mongoose')


//routes
const userRoutes =require('./routes/userRoutes')
const adminRoutes =require('./routes/admin/authRoutes')
const categoryRoutes = require('./routes/CategoryRoute')


const app = express()



mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
})
.then(()=>console.log('db connected'))




app.use(express.json())
//app.use(bodyParser())
app.use('/api',userRoutes)
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})