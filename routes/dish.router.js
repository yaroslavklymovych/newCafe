const express = require('express');
const router = express.Router();
const dishService = require('../middleware/dishValidate');
const { CreateDishDto } = require('../dto/dish.dto');
const Dish = require('../models/Dish');

router.post('/dish', async (req, res) => {
    try {
        // const { name, taste, price, weight } = req.body;
        console.log(req.body);
        console.log("Dish router")
        const dto = new CreateDishDto(req.body);
        const validationError = dto.validate();
        console.log(dto);
        console.log(validationError);
        if (!validationError.success) {
            return res.status(400).json({ message: validationError.message });
        } else {
            const dish = await Dish.create({
                Name: dto.Name,
                Description: dto.Description,
                Taste: dto.Taste,
                Price: dto.Price,
                Weight: dto.Weight,
                CategoryID: dto.CategoryID,
                MenuId: dto.MenuId
            });
            return res.status(201).json(dish);
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


router.get('/dish', async (req, res) => {
    try {
        const { cafeId, menuId } = req.query;
        const options = { where: {} };

        if (menuId) {
            options.where.MenuId = menuId;
        }

        if (cafeId) {
            options.include = [{
                model: Menu,
                where: { CafeId: cafeId },
                attributes: [] 
            }];
        }

        const dishes = await Dish.findAll(options);
        res.json(dishes);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


router.patch('/dish/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, taste, price, weight, categoryID, menuID } = req.body;

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