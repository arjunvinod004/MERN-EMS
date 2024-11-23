require('dotenv').config();
const mongoose =require('mongoose');
mongoose.connect(process.env.MONGO_DB)
.then(
    ()=>{
        console.log(' mongodb connected');
        
    }
)
.catch((err)=>console.error('not connected')
)

const userschema= new mongoose.Schema({
 name:String,
 email:String,
 password:String,
 role:{ type:String, enum:["employee","admin",]},
 profileimage:{type:Date, default:Date.now()},
 createdat:{type:Date, default:Date.now()},


})

const collection = mongoose.model("user",userschema);
module.exports=collection