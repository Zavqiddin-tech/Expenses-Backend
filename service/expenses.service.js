const expensesModel = require("../model/expenses.model");
const balansModel = require("../model/balans.model");
const payModel = require("../model/pay.model");
const departmentExpensesModel = require("../model/category/departmentExpenses.model");
const categoryExpensesModel = require("../model/category/categoryExpenses.model");
const fileService = require("./file.service");

class ExpensesService {
  async getAll(req, res) {
    const allExpensess = await expensesModel
      .find()
      .sort({ createdAt: -1 })
      .populate("pay");
    return allExpensess;
  }

  async getByCategory(req, res) {
    const expenses = await expensesModel
      .find({ category: req.params.id })
      .populate("pay")
      .sort({ createdAt: -1 });
    return expenses;
  }

  async create(req, res) {
    if (typeof req.body.amount !== 'number' && req.body.amount <= 1000) {
      throw new Error("Iltimos, 1000 so'mdan katta son kiriting");
    }
    const balans = await balansModel.findOne();
    if (balans.amount < req.body.amount) {
      throw new Error("Balansda pul yetarli emas");
    }
    const categoryExpenses = await categoryExpensesModel.findById(
      req.params.id
    );
    if (!categoryExpenses) {
      throw new Error("Kategoriya topilmadi");
    }
    const departmentExpenses = await departmentExpensesModel.findById(
      categoryExpenses.department
    );
    if (!departmentExpenses) {
      throw new Error("Bo'lim topilmadi");
    }

    const payData = {
      amount: req.body.amount,
      user: req.user.id,
      method: 1,
    };
    if (req.body.text) {
      payData.text = req.body.text;
    }

    const pay = await payModel.create(payData);

    const expensesData = {
      title: req.body.title,
      body: req.body.body,
      category: req.params.id,
      pay: pay._id,
      user: req.user.id,
      picture: [],
    };

    if (req.files) {
      console.log(req.files);
      const fileName = await fileService.save(req.files);
      expensesData.picture = Array.isArray(fileName) ? fileName : [...fileName];
    }

    console.log(expensesData);

    const newExpenses = await expensesModel.create(expensesData);
    const upBalans = await balansModel.findByIdAndUpdate(
      balans._id,
      {
        $inc: { amount: -pay.amount },
        $push: { history: pay._id },
      },
      { new: true }
    );
    const upDepartment = await departmentExpensesModel.findByIdAndUpdate(
      categoryExpenses.department,
      {
        $inc: { amount: pay.amount },
        $push: { history: pay._id },
      },
      { new: true }
    );
    const upCategory = await categoryExpensesModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { amount: pay.amount },
        $push: { history: pay._id },
      },
      { new: true }
    );

    const expenses = await expensesModel
      .findById(newExpenses._id)
      .populate("pay");

    return expenses;
  }

  
}

module.exports = new ExpensesService();
