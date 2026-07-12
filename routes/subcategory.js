const express = require('express');
const {SubCategory} = require('../models')
const router = express.Router();
router.use(express.json());


router.get('/api/subcategory', async (req, res) => {
  try {
    const subcategories = await SubCategory.findAll();
    res.json(subcategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});





router.post("/api/subcategory", async(req, res) =>{
    try{
        const {name, categoryid} = req.body;
        console.log(name, typeof categoryid);
          if(!name || !name.trim().length === 0 && !categoryid || !categoryid.trim().length === 0){
            return res.status(400).json({success: false, message: "Name and Category ID are required."});
        }

        console.log(SubCategory);
        if (await SubCategory.findOne({ where: { Name: name.trim() } })) {
           return res.status(400).json({ success: false, message: "Subcategory with this name already exists." });
        }
        await SubCategory.create({Name:name.trim(), FK_Category:categoryid.trim()});
        res.json({success: true, message: "Subcategory created"});

    }
    catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Server error"});
    }
});

module.exports = router;