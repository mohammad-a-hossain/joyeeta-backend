const User = require('../models/User')
const jwt = require('jsonwebtoken');

exports.createUser =(req,res)=>{
        User.findOne({email:req.body.email})
        .exec((error, user)=>{//console.log(error)
            if(user)
            return res.status(400).json({
             message:'user already exist'
            })
     
            const {firstname,lastname,email,password}= req.body 
            const _user = new User({
                firstname,lastname,email,password,username:Math.random().toString()
            })
            _user.save((error,data)=>{
                if(error){console.log(error)
                    return res.status(400).json({
                        message:'something went wrong'
                    })
                }
                if(data){
                    return res.status(201).json({
                        message:'user created success'
     
                    })
                }
            })      
     
        })
     
}
exports.signin = (req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error){
            return res.status(400).json({
                message:error 
            })
            if(user.authenticate(req.body.password)){
                const jwt = jwt.signin()
            }
        }else{
            return res.status(400).json({
                message:'something went wrong'
            })
        }
    })
}