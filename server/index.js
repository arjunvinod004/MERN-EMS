const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemon = require('nodemon')
const app = express();
app.use(express.json());
require('dotenv').config();
const collection= require('./mongoose');
const userreg=require('./models/userregister')
app.use(express.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Adjust as needed
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.get('/',(req,res)=>{
    res.send('<h1>hi node</h1>')
})
// login api call

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Check if the password matches
        if (user.password == password) {
            return res.status(401).json({ success: false, error: "Incorrect password" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.Jwt_Key,
            { expiresIn: "12d" }
        );

        // Send response
        res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ success: false, error: error.message });
    }
});
app.listen(process.env.PORT,function(){
    console.log(`connected to ${process.env.PORT}`);
    
})