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
    validatePassword(password){
            const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
            if (!passwordRegex.test(password)) {
                throw new Error("Password must be at least 8 characters long and contain at least 6 letters and 2 numbers");
            }
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
        // if (!this.Password || this.Password.trim() === "") throw new Error("Password is required")  
        if (!this.Username || this.Username.trim() === "") throw new Error("Username is required")
        if (this.Password) {
            this.validatePassword(this.Password)
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