class CreateIngridientDto{
    constructor({
        name,
        description
    }) {
        this.name = name;
        this.description = description;
    }
    validate(){
        if (!this.name || this.name.trim() === "") return { success: false, error: "Name is required" };
        else if (!this.description || this.description.trim() === "") return { success: false, error: "Description is required" };

        return { success: true };
    }
}

class IngridientResponseDto {
    id;
    name;
    description;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
    }
}

module.exports = {
    CreateIngridientDto,
    IngridientResponseDto
};