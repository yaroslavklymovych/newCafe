const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const  User  = require('../models/User');
const { auth } = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');


router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['Password'] }
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


router.get('/user', auth, checkRole('admin'), async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] }
            });
            res.json(users);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
);

router.patch('/:id', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const { email, password, username } = req.body;
        if (email) {
            user.email = email;
        }
        if (username) {
            user.username = username;
        }
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        await user.save();
        res.json({
            message: 'User updated',
            user
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


router.delete('/:id', auth, checkRole('admin'), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        await user.destroy();

        res.json({
            message: 'User deleted'
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// router.get('/admin', auth, checkRole("admin"), (req, res) => {
//     res.json({ message: `Welcome to the admin panel, ${req.user.email}!` });
// });

module.exports = router;
