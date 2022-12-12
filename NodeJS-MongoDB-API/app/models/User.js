const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
            select:false
        }
        //createdAt:{
        //    type:Date,
        //    default: Date.now
        //}
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('user', userSchema);