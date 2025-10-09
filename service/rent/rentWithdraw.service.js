const rentWithdrawModel = require("../../model/rent/rentWithdraw.model");
const rentBalansModel = require("../../model/rent/rentBalans.model");

class RentWithdrawService {
    async getAll(req, res) {
        const allPayments = await rentWithdrawModel
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

        const max = balans.amount - req.body.amount;
        if (max < 0) throw new Error("Balans minusga chiqib ketadi");

            const payData = {
                amount: req.body.amount,
                user: req.user.id,
            };
            if (req.body.text) payData.text = req.body.text;

            const pay = await rentWithdrawModel.create(payData);
            if (!pay) throw new Error("To'lov yaratishda xatolik yuz berdi");

            await rentBalansModel.findByIdAndUpdate(
                balans._id,
                {
                    $inc: { amount: -pay.amount },
                },
                { new: true }
            );

            return pay;
    }

    /* DELETE */
    async deleteItem(req, res) {
        const pay = await rentWithdrawModel.findById(req.params.payId);
        const balans = await rentBalansModel.findOne();

        if (!pay || !balans) throw new Error("Ma'lumot topilmadi");

            await rentBalansModel.findByIdAndUpdate(
                balans._id,
                {
                    $inc: { amount: pay.amount },
                },
                { new: true }
            );
            const deleted = await rentWithdrawModel.findByIdAndDelete(pay._id);
            return deleted;
        }
}

module.exports = new RentWithdrawService();
