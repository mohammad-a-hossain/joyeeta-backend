const multer = require('multer')
const shortid = require('shortid')
const path =require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploadsProducts'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  
  
 exports.upload = multer({storage})
