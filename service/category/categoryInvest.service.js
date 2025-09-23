const categoryInvestModel = require("../../model/category/categoryInvest.model");

class CategoryInvestService {
  async getAll(req, res) {
    const allCategories = await categoryInvestModel.find();
    return allCategories;
  }
  async getOne(req, res) {
    const category = await categoryInvestModel
      .findById(req.params.id)
      .populate({ path: "history", options: { sort: { createdAt: -1 } } });
    return category;
  }

  async create(req, res) {
    const categoryName = req.body.name.toLowerCase();

    const existingCategory = await categoryInvestModel.findOne({
      name: categoryName,
    });

    if (existingCategory) {
      throw new Error("Bu kategoriya mavjud");
    }

    const newCategory = await categoryInvestModel.create({
      name: categoryName,
      user: req.user.id,
    });
    return newCategory;
  }

  async update(req, res) {
    const categoryInvest = await categoryInvestModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    return categoryInvest;
  }
}

module.exports = new CategoryInvestService();
