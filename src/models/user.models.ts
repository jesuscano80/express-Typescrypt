import {Schema, model} from "mongoose"

const userSchema= new Schema({
    email:String,
    password:String,
    valid: {type:Boolean},
    passwordResetId: String
},
{  
    timestamps: false,
    version: false
})

export default model('User', userSchema);