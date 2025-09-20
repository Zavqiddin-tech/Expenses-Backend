const payModel = require("../model/pay.model");
const balansModel = require("../model/balans.model");
const categoryInvestModel = require("../model/category/categoryInvest.model")

class InvestService {
  async getAll(req, res) {
    const limit = parseInt(req.query.limit);

    const allInvests = await payModel
      .find({ method: 0 })
      .sort({ createdAt: -1 })
      .limit(limit);
    return allInvests;
  }

  async getAllPay(req, res) {
    const allPays = await payModel.find({ method: 0 }).sort({ createdAt: -1 });
    return allPays;
  }

  async create(req, res) {
    const isCategory = await categoryInvestModel.findById(req.params.id)
    if (req.body.amount <= 1000) {
      throw new Error("Iltimos, 1000 so'mdan katta son kiriting");
    }
    if(!isCategory) {
      throw new Error("Sarmoya uchun kategoriya topilmadi");
    }

    const payData = {
      amount: req.body.amount,
      text: req.body.text,
      method: 0,
      user: req.user.id,
    };


    const pay = await payModel.create(payData);
    const balans = await balansModel.findOne();
    const newBalans = await balansModel.findByIdAndUpdate(
      balans._id,
      {
        $inc: { amount: pay.amount },
        $push: { history: pay._id },
      },
      { new: true }
    );
    const newCategoryInvest = await categoryInvestModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { amount: pay.amount },
        $push: { history: pay._id },
      },
      { new: true }
    );

    return { pay, newBalans, newCategoryInvest };
  }
}

module.exports = new InvestService();
