// db schema

const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{ 
         type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
        unique:true
    },
    role:{
        type:String,
       default:"user"},
   address: {
        type: String,
        default: ""
   }
},{
    collection:"users",
    timestamps:true
})

module.exports=mongoose.model("user",userSchema)