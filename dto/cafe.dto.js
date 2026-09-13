class CreateCafeDto {
constructor({
    Name,
    Location,
    Contact,
    TypeOfService,
    POSSystem,
    AmountOfOrders,
    ContactPerson,
    Phone,
    UserId
}) {
        this.Name = Name;
        this.Location = Location;
        this.Contact = Contact;
        this.TypeOfService = TypeOfService;
        this.POSSystem = POSSystem;
        this.AmountOfOrders = AmountOfOrders;
        this.ContactPerson = ContactPerson;
        this.Phone = Phone;
        this.UserId = UserId;
    }
    validate() {
    if (!this.Name || this.Name.trim() === "") throw new Error("Name is required");
    if (!this.Location || this.Location.trim() === "") throw new Error("Location is required");
    if (!this.Contact || this.Contact.trim() === "") throw new Error("Contact is required");
    if (!this.TypeOfService || this.TypeOfService.trim() === "") throw new Error("TypeOfService is required");
    if (!this.POSSystem || this.POSSystem.trim() === "") throw new Error("POSSystem is required");
    if (!this.AmountOfOrders || !Number.isFinite(this.AmountOfOrders)) throw new Error("AmountOfOrders must be a number");
    if (!this.ContactPerson || this.ContactPerson.trim() === "") throw new Error("ContactPerson is required");
    if (!this.Phone || this.Phone.trim() === "") throw new Error("Phone is required");
    if (!this.UserId || !Number.isFinite(this.UserId)) throw new Error("UserId must be a number");

    return true;
}

}

class CafeResponseDto {
    id;
    Name;
    Location;
    Contact;
    TypeOfService;
    POSSystem;
    AmountOfOrders;
    ContactPerson;
    Phone;
    UserId;

    constructor(model) {
        this.id = model.id;
        this.Name = model.Name;
        this.Location = model.Location;
        this.Contact = model.Contact;
        this.TypeOfService = model.TypeOfService;
        this.POSSystem = model.POSSystem;
        this.AmountOfOrders = model.AmountOfOrders;
        this.ContactPerson = model.ContactPerson;
        this.Phone = model.Phone;
        this.UserId = model.UserId;
    }
}

module.exports = { CreateCafeDto, CafeResponseDto };