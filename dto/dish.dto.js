class CreateDishDto {
    constructor({
        Name,
        Taste,
        Description,
        Price,
        Weight,
        CategoryID,
    }) {
        this.Name = Name
        this.Taste = Taste
        this.Description = Description
        this.Price = Price
        this.Weight = Weight
        this.CategoryID = CategoryID
    }

    validate() {
        if (!this.Name || this.Name.trim() === "") throw new Error("Name is required")
        if (!this.Taste || this.Taste.trim() === "") throw new Error("Taste is required")
        if (!this.Description || this.Description.trim() === "") throw new Error("Description is required")    
        if (this.Price === undefined || this.Price === null || isNaN(this.Price)) throw new Error("Price must be a valid number")
        if (!this.Weight || this.Weight.trim() === "") throw new Error("Weight is required")
        if (!this.CategoryID || this.CategoryID.trim() === "") throw new Error("CategoryID is required")

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
        CategoryID
    }) {
        this.ID = ID
        this.Name = Name
        this.Taste = Taste
        this.Description = Description
        this.Price = Price
        this.Weight = Weight
        this.CategoryID = CategoryID
        
    }
}


class UpdateDishDto {
    constructor(name, taste, price, weight) {
        this.Name = name
        this.Taste = taste
        this.Description = Description
        this.Price = price
        this.Weight = weight
        this.CategoryID = CategoryID
    }
}

module.exports = {
    CreateDishDto,
    DishResponseDto,
    UpdateDishDto
}