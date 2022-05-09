 const express = require('express')
 const env = require('dotenv')
 require('dotenv').config();
 const mongoose = require('mongoose')
 const path = require('path')
 const cors = require('cors')


//routes
const userRoutes =require('./routes/userRoutes')
const adminRoutes =require('./routes/admin/authRoutes')
const categoryRoutes = require('./routes/CategoryRoute')
const productRoutes = require('./routes/ProductRoute')
const getAlltData = require('./routes/admin/allData')
const cartRoute = require('./routes/cartRoute')



const app = express()

 // here insteade of localhost set 127.0.0.1 for node v-17

mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
})
.then(()=>console.log('db connected'))




app.use(express.json())
app.use(cors())
app.use('/public',express.static(path.join(__dirname,'uploadsCategories')))
app.use('/api',userRoutes)
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',getAlltData)
app.use('/api',cartRoute)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})