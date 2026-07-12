// "use strict";

// const express = require("express");
// const router = express.Router();
// const path = require("path");
// const fs = require("fs");
// const { Dish, Category, dish } = require("../models");
// const multer = require("multer");

// router.use(express.json());


// router.get('/api/dish', async (req, res) => {
//   try {
//     const dish = await dish.findAll();
//     res.json(dish);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// function pickFieldByNames(model, candidates, fallback) {
//   try {
//     const attrs = model?.rawAttributes ? Object.keys(model.rawAttributes) : [];
//     const hit = candidates.find((k) => attrs.includes(k));
//     return hit || fallback || candidates[0];
//   } catch {
//     return fallback || candidates[0];
//   }
// }

// function pickCategoryFK(DishModel, CategoryModel) {
//   try {
//     const attrs = DishModel?.rawAttributes || {};
//     let tableName =
//       typeof CategoryModel?.getTableName === "function"
//         ? CategoryModel.getTableName()
//         : (CategoryModel?.tableName || "Categories");
//     if (typeof tableName === "object" && tableName?.tableName) tableName = tableName.tableName;
//     for (const [key, def] of Object.entries(attrs)) {
//       const ref = def?.references;
//       const refModel = ref && (ref.model?.tableName || ref.model);
//       if (refModel && String(refModel).toLowerCase() === String(tableName).toLowerCase()) return key;
//     }
//     return pickFieldByNames(DishModel, ["categoryId","CategoryID","FK_CategoryID","CategoryId","Category_ID","category_id","idCategory","FKCategory"], "FK_Category");
//   } catch (e) {
//     return "FK_Category";
//   }
// }
  

// router.post('/api/dish', async (req, res) => {
//   let savedFilePath = null;
//   try {
//     const { name, taste, price, weight, description, categoryId} = req.body;

//     if (!name || !name.trim()) return res.status(400).json({ success: false, message: "Name is required." });
//     const nPrice = Number(price);
//     if (!Number.isFinite(nPrice)) return res.status(400).json({ success: false, message: "Price must be a number." });
    
//     if (!description || !description.trim()) return res.status(400).json({ success: false, message: "Description is required." });
   
//     if (!categoryId) return res.status(400).json({ success: false, message: "Category is required." });

//     if (!taste || !taste.trim()) return res.status(400).json({ success: false, message: "Taste is required." });
    

//     if (!weight) return res.status(400).json({ success: false, message: "Weight is required." });


//     if (await Dish.findOne({ where: { Name: name.trim() } })) {
//            return res.status(400).json({ success: false, message: "Dish with this name already exists." });
//     }

//     const category = await Category.findByPk(categoryId);
//     if (!category) return res.status(400).json({ success: false, message: "Category not found." });

//     const nameField = pickFieldByNames(Dish, ["Name","name"], "Name");
//     const priceField = pickFieldByNames(Dish, ["Price","price"], "Price");
//     const descField = pickFieldByNames(Dish, ["Description","description"], "Description");
//     const categoryFkField = pickCategoryFK(Dish, Category);
//     const tasteField = pickFieldByNames(Dish, ["Taste","taste"], "Taste");
//     const weightField = pickFieldByNames(Dish, ["Weight","weight"], "Weight");


//     const toCreate = {};
//     toCreate[nameField] = name.trim();
//     toCreate[priceField] = nPrice;
//     toCreate[descField] = description.trim();
//     toCreate[categoryFkField] = categoryId;
//     toCreate[tasteField] = taste.trim();
//     toCreate[weightField] = weight;
//     console.log("Creating dish with data: ", toCreate);


//     const item = await Dish.create(toCreate);
//     res.json({ success: true, message: "Dish created", item });
//   } catch (e) {
//     if (savedFilePath && fs.existsSync(savedFilePath)) {
//       try { fs.unlinkSync(savedFilePath); } catch {}
//     }
//     res.status(500).json({ success: false, message: "Server error: " + e.message});
//   }
// });



// router.patch('/api/dish/:id', async (req, res) => {
//   try{
//     const{id} = req.params;
//     const dish = await Dish.findByPk(id);
//     if(!dish){
//       return res.status(404).json({success: false, message: 'dish not found'})
//     }
//     const updates = {};

//     if(req.body.hasOwnProperty('Name') || req.body.hasOwnProperty('name')){
//       const v = (req.body.Name ?? req.body.name ?? '').trim();
//       if(!v){
//         return res.status(400).json({success: false, message: 'Name cannot be empty'});
//       }
//       updates.Name = v;
//     }


//     if(req.body.hasOwnProperty('Description') || req.body.hasOwnProperty('description')){
//       const v = (req.body.Description ?? req.body.description ?? '').trim();
//       if(!v){
//         return res.status(400).json({success: false, message: 'Description cannot be empty'});
//       }
//       updates.Description = v;
//     }

//     if(req.body.hasOwnProperty('Price') || req.body.hasOwnProperty('price')){
//       const v = Number(req.body.Price ?? req.body.price ?? '').toString();
//       if(Number.isFinite(v)){
//         return res.status(400).json({success: false, message: 'Price cannot be empty'});
//       }
//       updates.Price = v;
//     }

//     if(Object.keys(updates).length === 0){
//       return res.status(400).json({success: false, message: 'No valid fields to update'});
//     }

//     await dish.update(updates);
//     return res.status(200).json({success: true, message: 'Menu item updated', data: dish});
//   }
//   catch(err){
//     console.error(err);
//     return res.status(500).json({success: false, message: 'Server error: ' + err});
//   }
// });

// router.delete('/api/dish/:id', async (req, res) =>{
//   try{
//     const {id} = req.params;
//     const dish = await Dish.findByPk(id);
//     if(!dish){
//       return res.status(404).json({success: false, message: 'dish not found'});
//     }
//     await dish.destroy();
//     return res.status(200).json({success: true, message: 'dish deleted'});
//   } catch(err){
//     console.error("Server error while deleting: ", err);
//     return res.status(500).json({success: false, message: 'Server error'});
//   }
// })



// router.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError || err?.message === 'Unsupported file type') {
//     return res.status(400).json({ success: false, message: err.message });
//   }
//   next(err);
// });

// router.get("/api/categories/_ping", (req, res) => res.json([{ id: 1, name: "Ping OK" }]));

// module.exports = router;


// const { CreateDishDto, UpdateDishDto } = require('../dto/dish.dto');
// const User = require('../models/Dish');

// class DishService {
//     async createDish(name, taste, price, weight){
//         const exitingDish = await Dish.findOne({ where: { name } });
//         if (exitingDish) {
//             throw new Error('Dish already exists');
//         } 
//         const dish = await Dish.create({
//             name: CreateDishDto.name,
//             taste: CreateDishDto.taste,
//             price: CreateDishDto.price,
//             weight: CreateDishDto.weight
//         });
//         return dish;
//     }
//     async getAllDishes() {
//         return await Dish.findAll();
//     }

//     async getDishById(id) {
//         const dish = await Dish.findByPk(id);
//         if (!dish) {
//             const error = new Error('Dish not found');
//             error.status = 404;
//             throw error;
//         }
//         if (UpdateDishDto.name !== undefined) {
//             user.name = UpdateDishDto.name;
//         }
//         if (UpdateDishDto.taste !== undefined) {
//             user.taste = UpdateDishDto.taste;
//         }
//         if (UpdateDishDto.price !== undefined) {
//             user.price = UpdateDishDto.price;
//         }
//         if (UpdateDishDto.weight !== undefined) {
//             user.weight = UpdateDishDto.weight;
//         }
//         await user.save();
//         return user;
//     }

//     async deleteDish(id) {
//         const user = await User.findByPk(id);
//         if (!user) {
//             const error = new Error('Dish not found');
//             error.status = 404;
//             throw error;
//         }
//         await user.destroy();
//         return { message: 'User deleted successfully' };
//     }
// }

// module.exports = new DishService();