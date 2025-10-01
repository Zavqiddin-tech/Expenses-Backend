const rentPaymentModel = require("../../model/rent/rentPayment.model");
const rentBalansModel = require("../../model/rent/rentBalans.model");
const rentCategoryModel = require("../../model/rent/rentCategory.model");

class RentPaymentService {
  async getAll(req, res) {
    const allPayments = await rentPaymentModel
      .find({ categoryId: req.params.id, method: 0 })
      .sort({ createdAt: -1 });
    return allPayments;
  }

  async create(req, res) {
    if (typeof req.body.amount !== "number")
      throw new Error("Iltimos, raqam (son) kiriting");

    if (req.body.amount <= 1000)
      throw new Error("Iltimos, 1 000 so'mdan katta qiymat kiriting");

    const balans = await rentBalansModel.findOne();
    if (!balans) throw new Error("Balans topilmadi");
    const isCategory = await rentCategoryModel.findById(req.params.id);

    if (!isCategory) throw new Error("Kategoriya topilmadi");

    const payData = {
      amount: req.body.amount,
      title: req.body.title,
      method: 0,
      user: req.user.id,
      categoryId: req.params.id,
    };
    if (req.body.text) payData.text = req.body.text;

    const pay = await rentPaymentModel.create(payData);
    if (!pay) throw new Error("To'lov yaratishda xatolik yuz berdi");

    await rentCategoryModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { amount: pay.amount },
      },
      { new: true }
    );

    await rentBalansModel.findByIdAndUpdate(
      balans._id,
      {
        $inc: { amount: pay.amount },
      },
      { new: true }
    );

    return pay;
  }

  /* UPDATE */
  async update(req, res) {
    if (typeof req.body.amount !== "number") {
      throw new Error("Iltimos, raqam (son) kiriting");
    }
    if (req.body.amount <= 1000) {
      throw new Error("Iltimos, 1000 so'mdan katta qiymat kiriting");
    }

    const balans = await rentBalansModel.findOne();
    const pay = await rentPaymentModel.findById(req.params.payId);
    if (!pay || !balans) {
      throw new Error("Balans yoki to'lov topilmadi");
    }
    const balansSum = balans.amount; // 5
    const paySum = pay.amount; // 5
    const newPay = req.body.amount - paySum; // 1 - 4 = -3
    const total = balansSum + newPay;

    if (total < 0 || typeof total !== "number") {
      throw new Error("Balans - minusga chiqib ketadi !!!");
    }

    const upPay = await rentPaymentModel.findByIdAndUpdate(
      req.params.payId,
      { amount: req.body.amount, text: req.body.text },
      { new: true }
    );

    await rentCategoryModel.findByIdAndUpdate(
      upPay.categoryId,
      {
        $inc: { amount: upPay.amount - pay.amount },
      },
      { new: true }
    );

    await rentBalansModel.findByIdAndUpdate(
      balans._id,
      {
        $inc: { amount: upPay.amount - pay.amount },
      },
      { new: true }
    );

    return upPay;
  }

  /* DELETE */
  async deleteItem(req, res) {
    const pay = await rentPaymentModel.findById(req.params.payId);
    const balans = await rentBalansModel.findOne();

    if (!pay || !balans) throw new Error("Ma'lumot topilmadi");

    await rentCategoryModel.findByIdAndUpdate(
      pay.categoryId,
      {
        $inc: { amount: -pay.amount },
      },
      { new: true }
    );

    await rentBalansModel.findByIdAndUpdate(
      balans._id,
      {
        $inc: { amount: -pay.amount },
      },
      { new: true }
    );

    const deleted = await rentPaymentModel.findByIdAndDelete(pay._id);
    return deleted;
  }
}

module.exports = new RentPaymentService();
