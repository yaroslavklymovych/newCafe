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
    validate(){
        if (!this.Name || this.Name.trim() === "") return { success: false, error: "Name is required" };
        else if (!this.Location || this.Location.trim() === "") return { success: false, error: "Location is required" };
        else if (!this.Contact || this.Contact.trim() === "") return { success: false, error: "Contact is required" };
        else if (!this.TypeOfService || this.TypeOfService.trim() === "") return { success: false, error: "TypeOfService is required" };
        else if (!this.POSSystem || this.POSSystem.trim() === "") return { success: false, error: "POSSystem is required" };
        else if (!this.AmountOfOrders || !Number.isFinite(this.AmountOfOrders)) return { success: false, error: "AmountOfOrders must be a number" };
        else if (!this.ContactPerson || this.ContactPerson.trim() === "") return { success: false, error: "ContactPerson is required" };
        else if (!this.Phone || this.Phone.trim() === "") return { success: false, error: "Phone is required" };
        else if (!this.UserId || !Number.isFinite(this.UserId)) return { success: false, error: "UserId must be a number" };

        return { success: true };
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