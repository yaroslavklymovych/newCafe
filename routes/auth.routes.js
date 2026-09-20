const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

        // FIX: was comparing plaintext password to the stored hash
        // (password === user.Password). Since /register hashes the
        // password with bcrypt, that comparison would never match.
        const passwordMatches = await bcrypt.compare(password, user.Password);

        if (passwordMatches) {
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