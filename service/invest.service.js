const payModel = require("../model/pay.model");
const balansModel = require("../model/balans.model");
const categoryInvestModel = require("../model/category/categoryInvest.model");

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
    if (typeof req.body.amount !== "number") {
      throw new Error("Iltimos, raqam (son) kiriting");
    }
    if (req.body.amount <= 1000) {
      throw new Error("Iltimos, 1 000 so'mdan katta qiymat kiriting");
    }

    const isCategory = await categoryInvestModel.findById(req.params.id);
    if (!isCategory._id) throw new Error("Kategoriya topilmadi");


    const payData = {
      amount: req.body.amount,
      text: req.body.text,
      method: 0,
      investId: isCategory._id,
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

  async update(req, res) {
    if (typeof req.body.amount !== "number") {
      throw new Error("Iltimos, raqam (son) kiriting");
    }
    if (req.body.amount <= 1000) {
      throw new Error("Iltimos, 1000 so'mdan katta qiymat kiriting");
    }

    const balans = await balansModel.findOne();
    const pay = await payModel.findById(req.params.payId);
    const balansSum = balans.amount
    const paySum = pay.amount
    const newPay = req.body.amount - paySum
    const total = balansSum + newPay
    if (total < 0) {
      throw new Error("Balans - minusga chiqib ketadi !!!");
    }


    const upPay = await payModel.findByIdAndUpdate(
        req.params.payId,
        { amount: req.body.amount, text: req.body.text },
        { new: true }
    );

    await categoryInvestModel.findByIdAndUpdate(
        req.params.routeId,
        {
          $inc: { amount: upPay.amount - pay.amount },
        },
        { new: true }
    );

    await balansModel.findByIdAndUpdate(
        balans._id,
        {
          $inc: { amount: upPay.amount - pay.amount },
        },
        { new: true }
    );

    return upPay;
  }
}

module.exports = new InvestService();
