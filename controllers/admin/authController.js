const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const shortid = require('shortid')


exports.signup =(req,res)=>{
  User.findOne({email:req.body.email})
  .exec(async(error, user)=>{//console.log(error)
      if(user)
      return res.status(400).json({
       message:'admin already exist'
      })

      const {firstname,lastname,email,password}= req.body 
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
          firstname,
          lastname,
          email,
          hash_password,
          username:shortid.generate(),
          role:"admin"
      })
      //console.log(_user)
      _user.save((error,data)=>{
          if(error){console.log(error)
              return res.status(400).json({
                  message:'something went wrong creating admin'
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
exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
         //const isPassword = await user.authenticate(req.body.password);
    if( user.authenticate(req.body.password) && user.role ==="admin") {
          const token = jwt.sign(
            { _id: user._id , role:user.role},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          )
          //const token = generateJwtToken(user._id, user.role);
          const { _id, firstname, lastname, email, role, fullname } = user
          res.cookie('token',token,{expiresIn:'1d'})
          res.status(200).json({
            token,
            user: { _id,firstname, lastname, email, role, fullname },
          })
        } else {
          return res.status(400).json({
            message: "invalid passwrod",
          })
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" })
      }
    })
  }

 exports.signout = (req, res) => {
   //console.log(req)
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};