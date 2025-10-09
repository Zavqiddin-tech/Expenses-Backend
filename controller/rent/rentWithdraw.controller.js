const rentWithdrawService = require("../../service/rent/rentWithdraw.service");

class RentWithdrawController {
    async getAll(req, res, next) {
        try {
            const allPayments = await rentWithdrawService.getAll(req, res);
            res.status(200).json(allPayments);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const newPayment = await rentWithdrawService.create(req, res);
            res.status(200).json(newPayment);
        } catch (error) {
            next(error);
        }
    }

    async deleteItem(req, res, next) {
        try {
            const deletedItem = await rentWithdrawService.deleteItem(req, res);
            res.status(200).json(deletedItem);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RentWithdrawController();
