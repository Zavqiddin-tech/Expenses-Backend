const balansService = require("../service/balans.service");

class BalansController {
	async getAll(req, res, next) {
		try {
			const balans = await balansService.getAll(req, res);
			res.status(200).json(balans);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const newBalans = await balansService.create(req, res);
			res.status(200).json(newBalans);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new BalansController();