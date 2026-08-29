class CreateCategoryDto{
    constructor({
        Name
    }) {
        this.Name = Name
    }

    validate(){
        if (!this.Name || this.Name.trim() === "")  return {succes: false, message: "Name is required"}

        return {succes: true, message: "Validation successful"}
    }
}

class CategoryResponseDto{
    constructor({
      Name  
    }) {
        this.Name = Name
    }
}

class UpdateCategoryDto {
    constructor ({
        Name
    }) {
        this.Name = Name
    }
}

module.exports = {
    CreateCategoryDto,
    CategoryResponseDto,
    UpdateCategoryDto
}