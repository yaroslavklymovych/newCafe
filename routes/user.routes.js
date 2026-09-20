const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { CreateUserDto } = require('../dto/user.dto');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');

const SALT_ROUNDS = 10;

router.post('/register', async (req, res) => {
    try {
        // Поддерживаем как name, так и username / Name / Username
        const name = req.body.name || req.body.username || req.body.Name || req.body.Username;
        const email = req.body.email || req.body.Email;
        const password = req.body.password || req.body.Password;

        if (!name) {
            return res.status(400).json({ message: 'Name/Username is required' });
        }

        const dto = new CreateUserDto(name, email, password);
        const validationError = typeof dto.validate === 'function' ? dto.validate() : null;
        if (validationError && !validationError.success) {
            return res.status(400).json({ message: validationError.message });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await User.create({
            Username: name,
            Email: email,
            Password: hashedPassword
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

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['Password'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/user', auth, checkRole('admin'), async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['Password'] }
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const email = req.body.email || req.body.Email;
        const password = req.body.password || req.body.Password;
        const username = req.body.username || req.body.Username || req.body.name || req.body.Name;

        if (email) user.Email = email;
        if (username) user.Username = username;
        if (password) user.Password = await bcrypt.hash(password, SALT_ROUNDS);

        await user.save();
        res.json({
            message: 'User updated',
            user
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/users/:id
router.delete('/:id', auth, checkRole('admin'), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;