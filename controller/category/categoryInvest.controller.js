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
  async getOne(req, res, next) {
    try {
      const oneCategory = await categoryService.getOne(req, res);
      res.status(200).json(oneCategory);
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
  
  async update(req, res, next) {
    try {
      const newCategory = await categoryService.update(req, res);
      res.status(200).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryInvestController();
