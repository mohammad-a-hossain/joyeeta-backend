const User = require('../../models/User')
const jwt = require('jsonwebtoken');


exports.signup =(req,res)=>{
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
                        message:'admin created success'
     
                    })
                }
            })      
     
        })
     
}
// exports.signin = (req,res)=>{
//     User.findOne({email:req.body.email})
//     .exec((error,user)=>{
//         if (error) return res.status(400).json({ error });
//             if(user){
//                 if(user.authenticate(req.body.password)){
//                 const token = jwt.sign({_id:user._id },process.env.JWT_SECRET,{expiresIn:'1d'})
//                 const {firstname,lastname,email,roll,fullname} = user
//                 res.status(200).json({
//                     token,
//                     user:{firstname,lastname,email,roll,fullname}
//                 })
//             }else{
//                return res.status(400).json({message:'invalid password'})
//             }
//             }else{
//             return res.status(400).json({message:'something went wrong'})
//               }
//     })
// }
exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
         //const isPassword = await user.authenticate(req.body.password);
       if( user.authenticate(req.body.password)) {
          const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          )
          //const token = generateJwtToken(user._id, user.role);
          const { _id, firstname, lastname, email, role, fullname } = user
          res.status(200).json({
            token,
            user: { _id,firstname, lastname, email, role, fullname },
          })
        } else {
          return res.status(400).json({
            message: "Something went wrong",
          })
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" })
      }
    })
  }
exports.requireSingin =(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    
    console.log(token)
    const user= jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
}