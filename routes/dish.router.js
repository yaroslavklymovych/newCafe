const express = require('express');
const router = express.Router();
const dishService = require('../middleware/dishValidate');
const { CreateDishDto } = require('../dto/dish.dto');
const Dish = require('../models/Dish');

router.post('/dish', async (req, res) => {
    try {
        // const { name, taste, price, weight } = req.body;
        const dto = new CreateDishDto(req.body);
        const validationError = dto.validate();
        console.log(dto);
        if (!validationError.success) {
            return res.status(400).json(validationError);
        } else {
            const dish = await Dish.create({
                name: dto.Name,
                description: dto.Description,
                taste: dto.Taste,
                price: dto.Price,
                weight: dto.Weight,
                categoryID: dto.CategoryID
            });
            return res.status(201).json(dish);
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/dish', async (req, res) => {
    try{
        const dishes = await Dish.findAll();
        res.json(dishes);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.patch('/dish/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, taste, price, weight, categoryID } = req.body;

        const dish = await Dish.findByPk(id);
        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }

        await dish.update({
            name,
            description,
            taste,
            price,
            weight,
            categoryID
        });

        res.json(dish);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.delete('/dish/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const dish = await Dish.findByPk(id);
        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }

        await dish.destroy();
        res.json({ message: 'Dish deleted' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;