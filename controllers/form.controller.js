const express = require('express');
const app = express();
const bcrypt = require('bcrypt'); // <-- Добавлен bcrypt
const Cafe = require('../models/Cafe');
const User = require('../models/User');

const { CreateFormDto, FormResponseDto } = require("../dto/form.dto");

const router = express.Router();
router.use(express.json());

const SALT_ROUNDS = 10;

router.post("/api/form", async (req, res) => {
    try {
        const dto = new CreateFormDto(req.body);
        dto.validate();

        const existingUser = await User.findOne({
            where: { Email: dto.Email }, // исправлено c email на Email
            attributes: ['id'] 
        });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Хешируем пароль перед сохранением
        const hashedPassword = await bcrypt.hash(dto.Password, SALT_ROUNDS);

        const user = await User.create({
            Username: dto.Username,
            Email: dto.Email,
            Password: hashedPassword
        });

        const form = await Cafe.create({
            UserId: user.id,
            Name: dto.Name,
            Location: dto.Location,
            Contact: dto.Contact,
            TypeOfService: dto.TypeOfService,
            POSSystem: dto.POSSystem,
            AmountOfOrders: dto.AmountOfOrders,
            ContactPerson: dto.ContactPerson,
            Phone: dto.Phone,
            Email: dto.Email
        });

        const responseDto = new FormResponseDto(form);

        return res.status(201).json(responseDto);
        
    } 
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;