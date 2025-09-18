const categoryService = require("../../service/category/categoryInvest.service");

class CategoryInvestController {
  async getAll(req, res, next) {
    try {
      const allCategories = await categoryService.getAll(req, res);
      res.status(200).json(allCategories);
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

module.exports = new CategoryInvestController();
