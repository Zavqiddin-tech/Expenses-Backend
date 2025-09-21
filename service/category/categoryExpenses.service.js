const categoryExpensesModel = require("../../model/category/categoryExpenses.model");
const departmentExpensesModel = require("../../model/category/departmentExpenses.model");

class CategoryExpensesService {
  async getAll(req, res) {
    const allCategories = await categoryExpensesModel.find({department: req.params.id});
    return allCategories;
  }

    async getOne(req, res) {
      const category = await categoryExpensesModel.findById(req.params.id).populate({path: "history", options: {sort: {createdAt: -1}}});
      return category;
    }

  async create(req, res) {
    const isDepartment = await departmentExpensesModel.findById(req.params.id);
    const categoryName = req.body.name.toLowerCase();

    console.log(isDepartment);

    if (!isDepartment) {
      throw new Error("Bo'lim topilmadi");
    }

    const existingCategory = await categoryExpensesModel.findOne({
      name: categoryName,
      department: req.params.id
    });

    if (existingCategory) {
      throw new Error("Bu kategoriya mavjud");
    }

    const newCategory = await categoryExpensesModel.create({
      name: categoryName,
      department: req.params.id,
      user: req.user.id,
    });
    return newCategory;
  }
}

module.exports = new CategoryExpensesService();
