// function validateDish(req, res, next) {
//     const { name, taste, description, price, weight } = req.body;  
//     if (!name || name.trim().length < 2 || !taste || taste.trim().length < 2 || !description || description.trim().length < 5 || !price || isNaN(price) || !weight || isNaN(weight)) {
//         return res.status(400).json({ error: 'All fields are required and must be valid' });
//     }
//     next();
// }
// function validateUpdateDish(req, res, next) {
//     const { name, taste, description, price, weight } = req.body; 
//     if ((name && name.trim().length < 2) || (taste && taste.trim().length < 2) || (description && description.trim().length < 5) || (price && isNaN(price)) || (weight && isNaN(weight))) {
//         return res.status(400).json({ error: 'All fields must be valid' });
//     }   
//     next();
// }

// module.exports = {
//     validateDish,
//     validateUpdateDish
// };