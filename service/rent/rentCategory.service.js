const rentCategoryModel = require("../../model/rent/rentCategory.model");

class RentCategoryService {
  async getAll(req, res) {
    const allCategories = await rentCategoryModel.find();
    return allCategories;
  }
  async getOne(req, res) {
    const category = await rentCategoryModel
      .findById(req.params.id)
      .populate({ path: "history", options: { sort: { createdAt: -1 } } });
    return category;
  }

  async create(req, res) {
    const categoryName = req.body.name.toLowerCase();

    const existingCategory = await rentCategoryModel.findOne({
      name: categoryName,
    });

    if (existingCategory) {
      throw new Error("Bu kategoriya mavjud");
    }

    const newCategory = await rentCategoryModel.create({
      name: categoryName,
      user: req.user.id,
    });
    return newCategory;
  }

  async update(req, res) {
    const rentCategory = await rentCategoryModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    return rentCategory;
  }
}

module.exports = new RentCategoryService();
