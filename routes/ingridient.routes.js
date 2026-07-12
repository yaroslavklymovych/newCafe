const express = require('express');
const { CreateIngridientDto } = require('../dto/ingridients.dto');
const router = express.Router();
const Ingridient = require('../models/Ingridients');

router.post('/ingridients', async (req, res) => {
    try {
        const dto = new CreateIngridientDto(req.body);
        console.log(dto);
        const validationError = dto.validate();

        if (!validationError.success) {
            return res.status(400).json(validationError);
        } else {
            const ingridient = await Ingridient.create({
                name: dto.name,
                description: dto.description
            });
            return res.status(201).json(ingridient);
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    } 
});

router.get('/ingridients', async (req, res) => {
    try {
        const ingridients = await Ingridient.findAll();
        res.json(ingridients);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.patch('/ingridients/:id', async (req, res) => {
    try {
        const ingridient = await Ingridient.findByPk(req.params.id);
        if (!ingridient) {
            return res.status(404).json({ message: 'Ingridient not found' });
        } else{
            const updatedIngridient = await ingridient.update(req.body);
            return res.json(updatedIngridient);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete('/ingridients/:id', async (req, res) => {
    try {
        const ingridient = await Ingridient.findByPk(req.params.id);
        if (!ingridient) {
            return res.status(404).json({ message: 'Ingridient not found' });
        } else{
            await ingridient.destroy();
            return res.json({ message: 'Ingridient deleted' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;