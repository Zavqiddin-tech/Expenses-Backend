const expensesModel = require("../model/expenses.model");
const balansModel = require("../model/balans.model");
const payModel = require("../model/pay.model");
const fileService = require("./file.service");

class ExpensesService {
  async getAll(req, res) {
    const limit = parseInt(req.query.limit);

    const allExpensess = await expensesModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(limit);
    return allExpensess;
  }

  async create(req, res) {
    if (req.body.amount <= 1000) {
      throw new Error("Iltimos, 1000 so'mdan katta son kiriting");
    }
    const balans = await balansModel.findOne();
    if (balans.amount < req.body.amount) {
      throw new Error("Balansda pul yetarli emas");
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
      category: req.body.category,
      pay: pay._id,
      user: req.user.id,
    };

    if (req.files) {
      const fileName = fileService.save(req.files);
      expensesData = {
        picture: Array.isArray(fileName) ? fileName : [...fileName],
      };
    }

    const newExpenses = await expensesModel.create(expensesData);
    const updatedBalans = await balansModel.findByIdAndUpdate(
      balans._id,
      {
        $inc: { amount: -pay.amount },
        $push: { history: pay._id },
      },
      { new: true }
    );

    return { newExpenses, updatedBalans };
  }
}

module.exports = new ExpensesService();
