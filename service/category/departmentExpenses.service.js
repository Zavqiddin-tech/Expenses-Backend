const departmentExpensesModel = require("../../model/category/departmentExpenses.model");

class DepartmentExpensesService {
  async getAll(req, res) {
    const allCategories = await departmentExpensesModel.find();
    return allCategories;
  }

  async create(req, res) {
    const departmentName = req.body.name.toLowerCase();

    const existingDepartment = await departmentExpensesModel.findOne({
      name: departmentName,
    });

    if (existingDepartment) {
      throw new Error("Bu kategoriya mavjud");
    }

    const newDepartment = await departmentExpensesModel.create({
      name: departmentName,
      user: req.user.id,
    });
    return newDepartment;
  }

  async update(req, res) {
		if (!req.body.name) {
			throw new Error("Matn kiriting");
		}
    const upDepartment = await departmentExpensesModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
			{new: true}
    );

    return upDepartment;
  }
}

module.exports = new DepartmentExpensesService();
