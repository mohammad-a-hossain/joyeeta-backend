const jwt = require("jsonwebtoken")

exports.requireSignin = (req, res, next) => {console.log(req)
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      console.log(user)
    } else {
      return res.status(400).json({ message: "Authorization required" });
    }
    next();
  }
  exports.userMiddlewear =(req,res,next)=>{
    if(req.user.role !== 'user'){
      return res.status(400).json({ message: " user access Authorization required" });
    }
    next();
  }
  exports.adminMiddlewear = (req,res,next)=>{
    if(req.user.role !== 'admin'){
      return res.status(400).json({ message: " admin access Authorization required" });
  }
  next()
}