const categoryService = require("../service/category.service");

class CategoryController {
	async getAll(req, res, next) {
		try {
			const allCategorys = await categoryService.getAll(req, res);
			res.status(200).json(allCategorys);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const newCategory = await categoryService.create(req, res);
			res.status(200).json(newCategory);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new CategoryController();