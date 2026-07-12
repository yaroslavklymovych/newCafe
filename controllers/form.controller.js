const express = require('express');
const app = express();
const Form = require('../models/Form');
const User = require('../models/User');

const { CreateFormDto, FormResponseDto } = require("../dto/form.dto");


const router = express.Router();
router.use(express.json());

router.post("/api/form", async (req, res) => {
    try {
        const dto = new CreateFormDto(req.body);
        dto.validate();
        console.log(dto);

        if(dto.validate()){
            const form = await Form.create({
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
        const user = await User.create({
            Username: dto.Username,
            Email: dto.Email,
            Password: dto.Password
        });

        const responseDto = new FormResponseDto(form);

        return res.status(201).json(responseDto);
        }  
        else{
            return res.status(400).json({ message: "Validation failed" });
        }

        
    } 
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


module.exports = router;