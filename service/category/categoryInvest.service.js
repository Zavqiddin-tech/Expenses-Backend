const categoryInvestModel = require("../../model/category/categoryInvest.model")

class CategoryInvestService {
	async getAll(req, res) {
		const allCategories = await categoryInvestModel.find();
		return allCategories;
	}

	async create(req, res) {

		const categoryName = req.body.name.toLowerCase();

		const existingCategory = await categoryInvestModel.findOne({ name: categoryName});

		if (existingCategory) {
			throw new Error("Bu kategoriya mavjud");
		}

		const newCategory = await categoryInvestModel.create({
			name: categoryName,
			user: req.user.id,
		});
		return newCategory;
	}
}

module.exports = new CategoryInvestService();
