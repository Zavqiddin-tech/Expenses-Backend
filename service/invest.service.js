const payModel = require("../model/pay.model");
const balansModel = require("../model/balans.model");

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
    if (req.body.amount <= 1000) {
      throw new Error("Iltimos, 1000 so'mdan katta son kiriting");
    }

    const payData = {
      amount: req.body.amount,
      method: 0,
      user: req.user.id,
    };

    if (req.body.text) {
      payData.text = req.body.text;
    }

    const pay = await payModel.create(payData);
    const balans = await balansModel.findOne();
    const updatedBalans = await balansModel.findByIdAndUpdate(
      balans._id,
      {
        $inc: { amount: newInvest.amount },
        $push: { history: pay._id },
      },
      { new: true }
    );

    return { newInvest, updatedBalans };
  }
}

module.exports = new InvestService();
