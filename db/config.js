const mongoose=require('mongoose')

const connectDb=async(url)=>{
    return await mongoose.connect(url)
    .then(res=>{
        if(Process.env.MODE==="development")
            console.log(`local mongo db connecyed`);
        if(Process.env.MODE==="production")
            console.log(`cloud   db connecyed`);
            
        
    }).catch(err=>console.log(err))
    
}

module.exports=connectDb