const investService = require("../service/invest.service");

class InvestController {
	async getAll(req, res, next) {
		try {
			const allInvests = await investService.getAll(req, res);
			res.status(200).json(allInvests);
		} catch (error) {
			next(error);
		}
	}
	
	async getAllPay(req, res, next) {
		try {
			const allPays = await investService.getAllPay(req, res);
			res.status(200).json(allPays);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const newInvest = await investService.create(req, res);
			res.status(200).json(newInvest);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new InvestController();