
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;  
//     const user = await users.findOne({ where: { email: email.trim().toLowerCase() } });
//     console.log(req.body);
//     //const hashedPassword = bcrypt.hashSync(password, 10);
//     console.log(user);
//     if (!user) {
//         return res.status(401).json({ message: "Invalid email or password" });
//     }
//     if (password === user.password) {
//         console.log(req.body);
//         console.log(user);
//         const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '1h' });
//         return res.json({ token });
    
//     }

    
//     return res.status(401).json({ message: "Invalid password" });
// });
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User'); 
const { jwtSecret } = require('../config');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ 
            where: { Email: email.trim().toLowerCase() } 
        });

        if (!user) {
            console.log("User not found in database");
            return res.status(401).json({ message: "Invalid email or password" });
        }

     
        console.log("User found:", user.Email); 

     
        if (password === user.Password) { 
            
            const token = jwt.sign(
                { 
                    id: user.id, 
                    email: user.Email, 
                    role: user.role || 'user' 
                }, 
                jwtSecret, 
                { expiresIn: '1h' }
            );

            return res.json({ token });
        }

        console.log("Password mismatch for user:", user.Email);
        return res.status(401).json({ message: "Invalid email or password" });

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;
