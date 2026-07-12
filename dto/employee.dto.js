class CreateEmployeeDto{
    constructor({
        name,
        lastName,
        position,
        salary,
    }) {
        this.name = name;
        this.lastName = lastName;
        this.position = position;
        this.salary = salary;
        
    }
    validate(){
        if (!this.name || this.name.trim() === "") return { success: false, error: "Name is required" };
        else if (!this.lastName || this.lastName.trim() === "") return { success: false, error: "Last name is required" };
        else if (!this.position || this.position.trim() === "") return { success: false, error: "Position is required" };
        else if (!this.salary || !Number.isFinite(this.salary)) return { success: false, error: "Salary must be a number" };

        return { success: true };
    }
}

class EmployeeResponseDto {
    id;
    name;
    lastName;
    position;
    salary;

    constructor(model) {
        this.id = model.EmployeeID;
        this.name = model.Name;
        this.lastName = model.LastName;
        this.position = model.Position;
        this.salary = model.Salary;
    }
}

module.exports = {
    CreateEmployeeDto,
    EmployeeResponseDto
};