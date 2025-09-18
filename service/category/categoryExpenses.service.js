const categoryExpensesModel = require("../../model/category/categoryExpenses.model")

class CategoryExpensesService {
  async getAll(req, res) {
    const allCategories = await categoryExpensesModel.find();
    return allCategories;
  }

  async create(req, res) {

		const categoryName = req.body.name.toLowerCase();

		const existingCategory = await categoryExpensesModel.findOne({ name: categoryName});

		if (existingCategory) {
			throw new Error("Bu kategoriya mavjud");
		}

    const newCategory = await categoryExpensesModel.create({
      name: categoryName,
      user: req.user.id,
    });
    return newCategory;
  }
}

module.exports = new CategoryExpensesService();
