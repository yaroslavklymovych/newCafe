const {CreateUserDto, UpdateUserDto, UserResponseDto} = require('../dto/user.dto');

const User = require('../services/user.service');

class UserController {
    async createUser(req, res) {
        try {
            const dto = new CreateUserDto(req.body.name, req.body.email, req.body.password);
            const user = await User.createUser(dto.name, dto.email);
            return res.status(201).json(new UserResponseDto(user));
        } catch (error) {
            next(error);
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers();
            return res.status(200).json(users.map(user => new UserResponseDto(user)));
        } catch (error) {
            next(error);
        } 
    }        
    async getUserById(req, res, next) {
            try {
                const dto = new UpdateUserDto(req.body);
                const user = await User.getUserById(req.params.id);
                return res.status(200).json(new UserResponseDto(user));
            } catch (error) {
                next(error);
            }  
    }
    async deleteUser(req, res, next) {
        try {
            const result = await User.deleteUser(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
