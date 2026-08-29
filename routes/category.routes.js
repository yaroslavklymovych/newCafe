const express = require('express');
const {Category} = require('../models')
const router = express.Router();
const { CreateCategoryDto } = require('../dto/category.dto')
const { where } = require('sequelize')



router.get('/category', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



router.post('/category', async (req, res) => {
    try{
      const dto = new CreateCategoryDto(req.body);
      console.log(dto);
      const validationError = dto.validate();

      if (validationError.succes !== false) {
        const category = await Category.create({
          Name: dto.Name
        });
        return res.status(201).json(category)
      } else{
        return res.status(400).json({
          message: "line 34: " + validationError.message
        });

      }

    } catch(err) {
      return res.status(500).json({ error: error.message, line: 'line 40' });
    }
});


router.get('/category/:id', async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);

      if(!category){
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
});

router.patch('/category/:id', async (req, res) => {
    try{
      const dto = new CreateCategoryDto(req.body);
      const validationError = dto.validate();
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      else if (validationError.succes !== true) {
        return res.status(400).json({
                message: "line 68 (patch): " + validationError.message
            });
      } else {
        const category = await Category.update({
          Name: dto.Name
        }, {
            where: {
              id: req.params.id
            }
        });

        res.json(category)
        return res.status(200).json(category)
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
});


router.delete('/category/:id', async (req, res) => {
  try{
    const category = await Category.findByPk(req.params.id);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    await category.destroy();
    res.json({ message: "Category deleted successfully"})

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
});

module.exports = router;