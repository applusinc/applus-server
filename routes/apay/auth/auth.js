const express = require('express');
const path = require('path');
const authRouter = express.Router();


authRouter.get("/signup", (req, res) => {
    //first step of signup
    const {name, surname, password, phone, email} = req.query;
    if(!name || !surname || !password || !phone || !email){
        return res.status(400).json({success: 0, message: "All parameters are required."});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({success: 0, message: "Invalid email address."});
    }
    if(password.length < 6){
        return res.status(400).json({success: 0, message: "Password must be at least 6 characters."});
    }
    if(phone.length != 12){
        return res.status(400).json({success: 0, message: "Phone number is badly formatted."});
    }
    res.sendFile(path.join(__dirname, 'otp_page.html'));
});




// CSS dosyasını dinamik olarak gönderen route
authRouter.get('/style.css', (req, res) => {
    
        res.sendFile(path.join(__dirname, 'style.css'));
    
    
});

// JavaScript dosyasını dinamik olarak gönderen route
authRouter.get('/otp_page.js', (req, res) => {
    
        res.sendFile(path.join(__dirname, 'otp_page.js'));
    
});

authRouter.get('/firebase-config.js', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'firebase_config.js'));

});


module.exports = authRouter;