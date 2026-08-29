import { PasswordValidatorManager } from '@password-validator/core';

class CreateFormDto {
    constructor({
        Name,
        Location,
        Contact,
        TypeOfService,
        POSSystem,
        AmountOfOrders,
        ContactPerson,
        Phone,
        Email,
        Password,
        Username
    }) {
        this.Name = Name
        this.Location = Location
        this.Contact = Contact
        this.TypeOfService = TypeOfService
        this.POSSystem = POSSystem
        this.AmountOfOrders = AmountOfOrders
        this.ContactPerson = ContactPerson
        this.Phone = Phone
        this.Email = Email
        this.Password = Password
        this.Username = Username
    }
    validate() {
        if (!this.Name || this.Name.trim() === "") throw new Error("Name is required")
        if (!this.Location || this.Location.trim() === "") throw new Error("Location is required")
        if (!this.Contact || this.Contact.trim() === "") throw new Error("Contact is required")
        if (!this.TypeOfService || this.TypeOfService.trim() === "") throw new Error("TypeOfService is required")
        if (!this.POSSystem || this.POSSystem.trim() === "") throw new Error("POSSystem is required")
        if (!this.AmountOfOrders || typeof this.AmountOfOrders !== 'number')
            throw new Error("AmountOfOrders must be a number")
        if (!this.ContactPerson || this.ContactPerson.trim() === "") throw new Error("ContactPerson is required")
        if (!this.Phone || this.Phone.trim() === "") throw new Error("Phone is required")
        if (!this.Email || this.Email.trim() === "") throw new Error("Email is required")
        if (!this.Username || this.Username.trim() === "") throw new Error("Username is required")
        const result = PasswordValidatorManager.fluent().min(8) .digit(1) .specialCharacter(1).validate(this.password);
        if (!result) {
            return { success: false, message: "Password does not meet the requirements" };
        }
    }
}

class FormResponseDto {
    constructor({
        ID,
        Name,
        Location,
        Contact,
        TypeOfService,
        POSSystem,
        AmountOfOrders,
        ContactPerson,
        Phone,
        Email
        }) {
        this.ID = ID
        this.Name = Name
        this.Location = Location
        this.Contact = Contact
        this.TypeOfService = TypeOfService
        this.POSSystem = POSSystem
        this.AmountOfOrders = AmountOfOrders
        this.ContactPerson = ContactPerson
        this.Phone = Phone
        this.Email = Email
    }
}

module.exports = {
    CreateFormDto,
    FormResponseDto
}