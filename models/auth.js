const {Schema,model} = require("mongoose")

const loginSchema = new Schema({
    user:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
});

const Auth = model("logins",loginSchema);

module.exports = Auth;

