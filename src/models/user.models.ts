import {Schema, model} from "mongoose"

const userSchema= new Schema({
    user:String,
    password:String,
    valid: {type:Boolean}
},
{  
    timestamps: false,
    version: false
})

export default model('User', userSchema);