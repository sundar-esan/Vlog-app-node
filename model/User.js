import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
     
    vlogs:[{ type: mongoose.Types.ObjectId,ref:"Vlog",required: true }]
});

export default mongoose.model("User",userSchema);