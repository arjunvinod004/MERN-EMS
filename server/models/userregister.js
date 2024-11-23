
const collection= require('../mongoose')
const userregister =async=async ()=>{
    collection();
    const newuser= new collection({
        name:"admin",
        email:"adminems@gmail.com",
        password:"admin2024",
        role:"admin"
    })
    await newuser.save();
    console.log('User added successfully');
try {
    
} catch (error) {
    console.log(error);
    
}
}
userregister();