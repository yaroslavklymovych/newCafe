class CreateDishDto {
    constructor({
        Name,
        Taste,
        Description,
        Price,
        Weight,
        CategoryID,
        MenuId
    }) {
        this.Name = Name
        this.Taste = Taste
        this.Description = Description
        this.Price = Price
        this.Weight = Weight
        this.CategoryID = CategoryID
        this.MenuId = MenuId
    }

    validate() {
        if (!this.Name || this.Name.trim() === "") return { success: false, message: "Name is required" }
        if (!this.Taste || this.Taste.trim() === "") return { success: false, message: "Taste is required" }
        if (!this.Description || this.Description.trim() === "") return { success: false, message: "Description is required" }
        if (this.Price === undefined || this.Price === null || isNaN(this.Price)) return { success: false, message: "Price must be a valid number" }
        if (!this.Weight || this.Weight.trim() === "") return { success: false, message: "Weight is required" }
        if (!this.CategoryID || this.CategoryID.trim() === "") return { success: false, message: "CategoryID is required" }
        if (!this.MenuId || this.MenuId.trim() === "") return { success: false, message: "MenuId is required" }

        return { success: true, message: "Validation successful" }
    }
}

class DishResponseDto {
    constructor({
        ID,
        Name,
        Taste,
        Description,
        Price,
        Weight,
        CategoryID,
        MenuId
    }) {
        this.ID = ID
        this.Name = Name
        this.Taste = Taste
        this.Description = Description
        this.Price = Price
        this.Weight = Weight
        this.CategoryID = CategoryID
        this.MenuId = MenuId
    }
}


class UpdateDishDto {
    constructor({
        Name,
        Taste,
        Description,
        Price,
        Weight,
        CategoryID,
        MenuId
    }) {
        this.Name = Name
        this.Taste = Taste
        this.Description = Description
        this.Price = Price
        this.Weight = Weight
        this.CategoryID = CategoryID
        this.MenuId = MenuId
    }
}

module.exports = {
    CreateDishDto,
    DishResponseDto,
    UpdateDishDto
}