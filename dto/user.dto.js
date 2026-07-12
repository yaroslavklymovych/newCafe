class CreateUserDto {
    constructor(name, email, password) {
        this.name = name;  
        this.email = email;
        this.password = password;
    }
}

class UpdateUserDto {
    constructor(name, email ) {
        this.name = name;  
        this.email = email;
    }
}

class UserResponseDto {
    constructor(id, name, email) {
        this.id = id;   
        this.name = name;
        this.email = email;
    }
}

module.exports = {
    CreateUserDto,
    UpdateUserDto,
    UserResponseDto
};