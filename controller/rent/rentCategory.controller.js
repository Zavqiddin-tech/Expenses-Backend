const rentCategoryService = require("../../service/rent/rentCategory.service");

class RentCategoryController {
	async getAll(req, res, next) {
		try {
			const allCategories = await rentCategoryService.getAll(req, res);
			res.status(200).json(allCategories);
		} catch (error) {
			next(error);
		}
	}
	async getOne(req, res, next) {
		try {
			const oneCategory = await rentCategoryService.getOne(req, res);
			res.status(200).json(oneCategory);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const newCategory = await rentCategoryService.create(req, res);
			res.status(200).json(newCategory);
		} catch (error) {
			next(error);
		}
	}
	
	async update(req, res, next) {
		try {
			const newCategory = await rentCategoryService.update(req, res);
			res.status(200).json(newCategory);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new RentCategoryController();
