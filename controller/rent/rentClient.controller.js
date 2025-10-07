const rentClientService = require("../../service/rent/rentClient.service");

class RentClientController {
	async getAll(req, res, next) {
		try {
			const allClients = await rentClientService.getAll(req, res);
			res.status(200).json(allClients);
		} catch (error) {
			next(error);
		}
	}
	async getOne(req, res, next) {
		try {
			const oneClient = await rentClientService.getOne(req, res);
			res.status(200).json(oneClient);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const newClient = await rentClientService.create(req, res);
			res.status(200).json(newClient);
		} catch (error) {
			next(error);
		}
	}
	
	async update(req, res, next) {
		try {
			const upClient = await rentClientService.update(req, res);
			res.status(200).json(upClient);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new RentClientController();
