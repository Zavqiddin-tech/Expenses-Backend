const rentPaymentModel = require("../../model/rent/rentPayment.model");
const rentBalansModel = require("../../model/rent/rentBalans.model");
const rentClientModel = require("../../model/rent/rentClient.model");

class RentPaymentService {
  async getAll(req, res) {
    const allPayments = await rentPaymentModel
      .find({ clientId: req.params.id })
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
    const isClient = await rentClientModel.findById(req.params.id);

    if (!isClient) throw new Error("Mijoz topilmadi");

    if (req.body.debt === true) {
      const payData = {
        amount: req.body.amount,
        title: req.body.title,
        month: req.body.month,
        year: req.body.year,
        method: 1,
        user: req.user.id,
        clientId: req.params.id,
      };
      if (req.body.text) payData.text = req.body.text;

      const pay = await rentPaymentModel.create(payData);
      if (!pay) throw new Error("To'lov yaratishda xatolik yuz berdi");

      await rentClientModel.findByIdAndUpdate(
          req.params.id,
          {
            $inc: { amount: -pay.amount },
          },
          { new: true }
      );
      return pay;
    }
    if(req.body.debt === false){
      const payData = {
        amount: req.body.amount,
        title: req.body.title,
        month: req.body.month,
        year: req.body.year,
        method: 0,
        user: req.user.id,
        clientId: req.params.id,
      };
      if (req.body.text) payData.text = req.body.text;

      const pay = await rentPaymentModel.create(payData);
      if (!pay) throw new Error("To'lov yaratishda xatolik yuz berdi");

      await rentClientModel.findByIdAndUpdate(
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
    if (pay.method === 0) {
      const balansSum = balans.amount;
      const paySum = pay.amount;
      const newPay = req.body.amount - paySum;
      const total = balansSum + newPay;

      if (total < 0 || typeof total !== "number") {
        throw new Error("Balans - minusga chiqib ketadi !!!");
      }

      const upPay = await rentPaymentModel.findByIdAndUpdate(
          req.params.payId,
          {
            amount: req.body.amount,
            title: req.body.title,
            text: req.body.text,
            month: req.body.month,
            year: req.body.year,
          },
          { new: true }
      );

      await rentClientModel.findByIdAndUpdate(
          upPay.clientId,
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

    if (pay.method === 1) {

      if (total < 0 || typeof total !== "number") {
        throw new Error("Balans - minusga chiqib ketadi !!!");
      }

      const upPay = await rentPaymentModel.findByIdAndUpdate(
          req.params.payId,
          {
            amount: req.body.amount,
            title: req.body.title,
            text: req.body.text,
            month: req.body.month,
            year: req.body.year,
          },
          { new: true }
      );

      await rentClientModel.findByIdAndUpdate(
          upPay.clientId,
          {
            //              100 000    -    200 000 = -100 000
            $inc: { amount: pay.amount - upPay.amount  },
          },
          { new: true }
      );
      return upPay;
    }
  }

  /* DELETE */
  async deleteItem(req, res) {
    const pay = await rentPaymentModel.findById(req.params.payId);
    const balans = await rentBalansModel.findOne();

    if (!pay || !balans) throw new Error("Ma'lumot topilmadi");

    if (pay.method === 0) {
      await rentCategoryModel.findByIdAndUpdate(
          pay.clientId,
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
    if (pay.method === 1) {
      await rentCategoryModel.findByIdAndUpdate(
          pay.clientId,
          {
            $inc: { amount: pay.amount },
          },
          { new: true }
      );
      const deleted = await rentPaymentModel.findByIdAndDelete(pay._id);
      return deleted;
    }
  }
}

module.exports = new RentPaymentService();
