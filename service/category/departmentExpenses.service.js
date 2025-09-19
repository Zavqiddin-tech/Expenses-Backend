const departmentExpensesModel = require("../../model/category/departmentExpenses.model")

class DepartmentExpensesService {
	async getAll(req, res) {
		const allCategories = await departmentExpensesModel.find();
		return allCategories;
	}

	async create(req, res) {

		const departmentName = req.body.name.toLowerCase();

		const existingDepartment = await departmentExpensesModel.findOne({ name: departmentName});

		if (existingDepartment) {
			throw new Error("Bu kategoriya mavjud");
		}

		const newDepartment = await departmentExpensesModel.create({
			name: departmentName,
			user: req.user.id,
		});
		return newDepartment;
	}
}

module.exports = new DepartmentExpensesService();
