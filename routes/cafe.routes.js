const express = require('express');
const { CreateCafeDto } = require('../dto/cafe.dto');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Cafe = require('../models/Cafe');

// authMiddleware убран из глобального router.use() и добавлен индивидуально к роутам

router.post('/cafe', authMiddleware, async (req, res) => {
    try {
        const dto = new CreateCafeDto(req.body);
        dto.validate(); 

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: User ID missing" });
        }

        const cafe = await Cafe.create({
            Name: dto.Name,
            Location: dto.Location,
            Contact: dto.Contact,
            TypeOfService: dto.TypeOfService,
            POSSystem: dto.POSSystem,
            AmountOfOrders: dto.AmountOfOrders,
            ContactPerson: dto.ContactPerson,
            Phone: dto.Phone,
            UserId: req.user.id
        });

        return res.status(201).json(cafe);
    } catch (error) {
        console.error("Error creating cafe:", error);
        return res.status(400).json({ message: error.message });
    }
});

router.get('/cafe', authMiddleware, async (req, res) => {
    try {
        const cafes = await Cafe.findAll({
            where: { UserId: req.user.id }
        });
        res.json(cafes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/cafe/:id', authMiddleware, async (req, res) => {
    try {
        const cafe = await Cafe.findOne({
            where: {
                id: req.params.id,
                UserId: req.user.id
            }
        });
        if (!cafe) {
            return res.status(404).json({ message: 'Cafe not found' });
        }
        res.json(cafe);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }   
});

router.delete('/cafe/:id', authMiddleware, async (req, res) => {
    try {
        const cafe = await Cafe.findOne({
            where: {
                id: req.params.id,
                UserId: req.user.id
            }
        });
        if (!cafe) {
            return res.status(404).json({ message: 'Cafe not found' });
        }
        await cafe.destroy();
        res.json({ message: 'Cafe deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.patch('/cafe/:id', authMiddleware, async (req, res) => {
    try {
        const dto = new CreateCafeDto(req.body);
        const validationError = dto.validate();
        const cafe = await Cafe.findOne({
            where: {
                id: req.params.id,
                UserId: req.user.id
            }
        });
        if (!cafe) {
            return res.status(404).json({ message: 'Cafe not found' });
        }
        if (validationError.success !== true) {
            return res.status(400).json({
                message: "Validation error: " + validationError.message
            });
        }

        await Cafe.update({
            Name: dto.Name,
            Location: dto.Location,
            Contact: dto.Contact,
            TypeOfService: dto.TypeOfService,
            POSSystem: dto.POSSystem,
            AmountOfOrders: dto.AmountOfOrders,
            ContactPerson: dto.ContactPerson,
            Phone: dto.Phone,
            UserId: req.user.id,
        }, {
            where: { id: req.params.id }
        });

        return res.status(200).json({ message: "Cafe updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;