const express = require('express');
const { CreateMenuDto } = require('../dto/menu.dto');
const router = express.Router();
const Menu = require('../models/Menu');

router.post('/menus', async (req, res) => {
    try {
        const dto = new CreateMenuDto(req.body);
        console.log(dto);
        const validationError = dto.validate();

        if (!validationError.success) {
            return res.status(400).json(validationError);
        } else {
            const menu = await Menu.create({
                name: dto.name,
                description: dto.description
            });
            return res.status(201).json(menu);
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    } 
});

router.get('/menus', async (req, res) => {
    try {
        const menus = await Menu.findAll();
        res.json(menus);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.patch('/menus/:id', async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        } else{
            const updatedMenu = await menu.update(req.body);
            return res.json(updatedMenu);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete('/menus/:id', async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        } else{
            await menu.destroy();
            return res.json({ message: 'Menu deleted' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;