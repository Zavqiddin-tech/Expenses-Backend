const categoryModel = require("../model/category.model");

class CategoryService {
  async getAll(req, res) {
    const allCategorys = await categoryModel.find();
    return allCategorys;
  }

  async create(req, res) {

		const categoryName = req.body.name.toLowerCase();

		const existingCategory = await categoryModel.findOne({ name: categoryName});

		if (existingCategory) {
			throw new Error("Bu kategoriya mavjud");
		}

    const newCategory = await categoryModel.create({
      name: categoryName,
      user: req.user.id,
    });
    console.log(newCategory);
    return newCategory;
  }
}

module.exports = new CategoryService();
