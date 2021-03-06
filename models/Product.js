const mongoose = require('mongoose')

const productSchem = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true 
    },
    offer:{
        type:Number
    },
    productPics:[
        {
            img:{type:String}
        }
    ],
    reviews:[
        {
        userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
        review:String
        }
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,ref:"Category",required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, ref:"User"
    },
    updatedAt:Date,

    

},{timestamps:true})

module.exports = mongoose.model("Product",productSchem)