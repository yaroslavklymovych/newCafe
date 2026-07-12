const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const {validateCreateUser, validateUpdateUser} = require('../middleWare/validate');
    
router.post('/create', validateCreateUser, (req, res, next) =>  UserController.createUser(req, res, next));
router.get('/users', (req, res, next) => UserController.getAllUsers(req, res, next));
router.get('/users/:id', validateUpdateUser, (req, res, next) => UserController.getUserById(req, res, next));
router.delete('/users/:id', (req, res, next) => UserController.deleteUser(req, res, next));

module.exports = router;