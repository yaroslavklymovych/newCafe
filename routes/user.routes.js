const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const  User  = require('../models/User');
const { auth } = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const dto = new CreateUserDto(name, email, password);
        const validationError = dto.validate();
        if (!validationError.success) {
            return res.status(400).json({ message: validationError.message });
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: 'User created successfully',
            id: user.id,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.get('/login', auth, async (req, res) => {
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
