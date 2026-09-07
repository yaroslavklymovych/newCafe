const { PasswordValidatorManager } = require('@password-validator/core');

class CreateUserDto {
    constructor(name, email, password) {
        this.name = name;  
        this.email = email;
        this.password = password;
    }

    validate() {
        if (!this.name || this.name.trim() === "") return { success: false, message: "Name is required" }
        if (!this.email || this.email.trim() === "") return { success: false, message: "Email is required" }
        const result = PasswordValidatorManager.fluent().min(8) .digit(1) .specialCharacter(1).validate(this.password);
        if (!result) {
            return { success: false, message: "Password does not meet the requirements" };
        }
        return { success: true, message: "Validation successful" };
    }
}

class UpdateUserDto {
    constructor(name, email ) {
        this.name = name;  
        this.email = email;
    }

    validate() {
        if (!this.name || this.name.trim() === "") return { success: false, message: "Name is required" }
        if (!this.email || this.email.trim() === "") return { success: false, message: "Email is required" }
        return { success: true, message: "Validation successful" };
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