const payModel = require("../models/pay.model");

class InvestService {
  async getAll(req, res) {
    const limit = parseInt(req.query.limit);

    const allInvests = await payModel
      .find({ method: 0 })
      .sort({ createdAt: -1 })
      .limit(limit);
    return allInvests;
  }

  async create(req, res) {
    const payData = {
      amount: req.body.amount,
      method: 0,
      user: req.user.id,
    };

    if (req.body.text) {
      payData.text = req.body.text;
    }

    const newInvest = await payModel.create(payData);

    return newInvest;
  }
}

module.exports = new InvestService();
