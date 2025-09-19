const departmentService = require("../../service/category/departmentExpenses.service");

class DepartmentExpensesController {
  async getAll(req, res, next) {
    try {
      const allDepartment = await departmentService.getAll(req, res);
      res.status(200).json(allCategories);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newDepartment = await departmentService.create(req, res);
      res.status(200).json(newDepartment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepartmentExpensesController();
