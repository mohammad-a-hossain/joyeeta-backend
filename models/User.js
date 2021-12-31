const mogoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mogoose.Schema(
    {
        firstname: {
            type: String,
            trim: true,
            required: true,
            max: 12,
            min:6
        },
        lastname: {
            type: String,
            trim: true,
            required: true,
            max: 32
        }, 
         username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            index:true,
            lowercase:true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        role: {
            type: String,
              enum:['user','admin'],
              default:'user' 
        },
       contactNumber:{type:String},
       profilePicture:{type:String}
    },
    { timestamps: true })

    userSchema
    .virtual('password')
    .set(function(password) {
        // encryptPassword
        this.hashed_password = bcrypt.hashSync(password,10);
    })
    userSchema
    .virtual('fullname')
    .get(function() {
        // encryptPassword
       return `${this.firstname} ${this.lastname}`
    })

userSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compare(password, this.hash_password);
    },
  };

    module.exports = mogoose.model('User',userSchema)