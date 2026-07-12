const express = require('express');
const {Category} = require('../models')
const router = express.Router();
router.use(express.json());


router.get('/api/category', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



router.post("/api/category", async(req, res) =>{
    try{
        const {name} = req.body;
        if(!name || !name.trim().length === 0){
            return res.status(400).json({success: false, message: "Name is required."});
        }
        console.log(Category);
        if (await Category.findOne({ where: { Name: name.trim() } })) {
           return res.status(400).json({ success: false, message: "Category with this name already exists." });
        }
        await Category.create({Name:name.trim()});
        res.json({success: true, message: "Category created"});


    }
    catch(err){
        console.error(err);
        res.status(500).json(({success: false, message: "Server error"}));
    }
});

module.exports = router;