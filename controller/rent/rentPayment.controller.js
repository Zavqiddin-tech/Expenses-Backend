const rentPaymentService = require("../../service/rent/rentPayment.service");

class RentPaymentController {
  async getAll(req, res, next) {
    try {
      const allPayments = await rentPaymentService.getAll(req, res);
      res.status(200).json(allPayments);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newPayment = await rentPaymentService.create(req, res);
      res.status(200).json(newPayment);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const newPayment = await rentPaymentService.update(req, res);
      res.status(200).json(newPayment);
    } catch (error) {
      next(error);
    }
  }
  async deleteItem(req, res, next) {
    try {
      const deletedItem = await rentPaymentService.deleteItem(req, res);
      res.status(200).json(deletedItem);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RentPaymentController();
