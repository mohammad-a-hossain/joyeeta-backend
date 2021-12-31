const User = require('../../models/User')
const jwt = require('jsonwebtoken');
//const bcrypt = require("bcrypt");


exports.signup =(req,res)=>{
  User.findOne({email:req.body.email})
  .exec((error, user)=>{//console.log(error)
      if(user)
      return res.status(400).json({
       message:'admin already exist'
      })

      const {firstname,lastname,email,password}= req.body 
      //const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
          firstname,
          lastname,
          email,
          password,
          username:Math.random().toString(),
          role:"admin"
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
exports.signin = (req,res)=>{
    User.findOne({email:req.body.email})
    .exec(async(error,user)=>{
        if (error) return res.status(400).json({ error });
            if(user){
                if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id:user._id },process.env.JWT_SECRET,{expiresIn:'1d'})
                // if (user) {
                //         const isPassword = await user.authenticate(req.body.password);
                //         if (
                //           isPassword &&
                //           (user.role === "admin")
                //         ) {
                //           const token = jwt.sign(
                //             { _id: user._id, role: user.role },
                //             process.env.JWT_SECRET,
                //             { expiresIn: "1d" }
                //           );
                const {firstname,lastname,email,roll,fullname} = user
                res.status(200).json({
                    token,
                    user:{firstname,lastname,email,roll,fullname}
                })
            }else{
               return res.status(400).json({message:'invalid password'})
            }
            }else{
            return res.status(400).json({message:'something went wrong'})
              }
    })
}
// exports.signin = (req, res) => {
//        User.findOne({ email: req.body.email }).exec(async (error, user) => {
//       if (error) return res.status(400).json({ error });
//       if (user) {
//          const isPassword = await user.authenticate(req.body.password);

//          if(isPassword &&(user.role === "admin")) {

//           const token = jwt.sign({ _id: user._id ,role: user.role },
//                   process.env.JWT_SECRET,
//                    { expiresIn: "1d" }
//           )

//       //  if( user.authenticate(req.body.password) && user.role==="admin") {
//       //     const token = jwt.sign({ _id: user._id ,role: user.role },
//       //       process.env.JWT_SECRET,
//       //       { expiresIn: "1d" }
//       //     )
//           //const token = generateJwtToken(user._id, user.role);
//           const { _id,firstname,lastname,email,role,fullname } = user

//           res.cookie('token',token, {expiresIn:"1hr"})
//           res.status(200).json({
//             token,
//             user: { _id,firstname, lastname, email, role, fullname },
//           })
//         } else {
//           return res.status(400).json({
//             message: "invalid password",
//           })
//         }
//       } else {
//         return res.status(400).json({ message: "Something went wrong" })
//       }
//     })
//   }
// exports.requireSingin =(req,res,next)=>{
//     const token = req.headers.authorization.split(" ")[1];
    
//     console.log(token)
//     const user= jwt.verify(token, process.env.JWT_SECRET)
//     req.user = user
//     next()
// }

// exports.signin = (req, res) => {
//   User.findOne({ email: req.body.email }).exec(async (error, user) => {
//     if (error) return res.status(400).json({ error })
//     if (user) {
//       const isPassword = await user.authenticate(req.body.password);
//       if (
//         isPassword &&
//         (user.role === "admin")
//       ) {
//         const token = jwt.sign(
//           { _id: user._id, role: user.role },
//           process.env.JWT_SECRET,
//           { expiresIn: "1d" }
//         );
//         const { _id, firstName, lastName, email, role, fullName } = user;
//         res.cookie("token", token, { expiresIn: "1d" });
//         res.status(200).json({
//           token,
//           user: { _id, firstName, lastName, email, role, fullName },
//         });
//       } else {
//         return res.status(400).json({
//           message: "Invalid Password",
//         });
//       }
//     } else {
//       return res.status(400).json({ message: "Something went wrong" });
//     }
//   });
// };

 exports.signout =(res,req)=>{
        res.clearCookie('token')
        res.status(200).json({
          message:"signout success admin"
        })
 }