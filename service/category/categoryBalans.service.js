const categoryBalansModel = require("../../model/category/categoryBalans.model")

class CategoryBalansService {
	async getAll(req, res) {
		const allCategories = await categoryBalansModel.find();
		return allCategories;
	}

	async create(req, res) {

		const categoryName = req.body.name.toLowerCase();

		const existingCategory = await categoryBalansModel.findOne({ name: categoryName});

		if (existingCategory) {
			throw new Error("Bu kategoriya mavjud");
		}

		const newCategory = await categoryBalansModel.create({
			name: categoryName,
			user: req.user.id,
		});
		return newCategory;
	}
}

module.exports = new CategoryBalansService();
