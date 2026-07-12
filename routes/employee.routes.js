const express = require('express');
const { CreateEmployeeDto } = require('../dto/employee.dto');
const router = express.Router();
const Employee = require('../models/Employee');

router.post('/employees', async (req, res) => {
    try {
        const dto = new CreateEmployeeDto(req.body);
        console.log(dto);
        const validationError = dto.validate();

        if (!validationError.success) {
            return res.status(400).json({
                message: "line 14: " + validationError.message
            });
        } else {
            const employee = await Employee.create({
                Name: dto.name,
                LastName: dto.lastName,
                Position: dto.position,
                Salary: dto.salary
            });
            return res.status(201).json(employee);
        }
    } catch (error) {
        return res.status(400).json({ message: "line 26: " + error });
    }
});

router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        return res.status(500).json({ message: "line 35: " + error.message  });
    }
});

router.patch('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "line 43: Employee not found" });
        } else{
            const updatedEmployee = await employee.update(req.body);
            return res.json(updatedEmployee);
        }
    } catch (error) {
        return res.status(500).json({ message: "line 49: " + error.message });
    }
});

router.delete('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if  (!employee) {
            return res.status(404).json({ message: "line 57: Employee not found" });
        } else {
            await employee.destroy();
            return res.json({ message: "line 60: Employee deleted" });
        }
    } catch (error) {
        return res.status(500).json({ message: "line 63: " + error.message });
    }   
});

module.exports = router;