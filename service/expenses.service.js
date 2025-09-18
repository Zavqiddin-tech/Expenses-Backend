const expensesModel = require("../model/expenses.model");
const balansModel = require("../model/balans.model");
const payModel = require("../model/pay.model");
const fileService = require("./file.service");

class ExpensesService {
  async getAll(req, res) {
    const allExpensess = await expensesModel.find().sort({ createdAt: -1 }).populate("pay")
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

    console.log(req.files);

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
      picture: []
    };

    if (req.files) {
      console.log(req.files);
      const fileName = await fileService.save(req.files);
      expensesData.picture = Array.isArray(fileName) ? fileName : [...fileName];
    }

    console.log(expensesData);

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
