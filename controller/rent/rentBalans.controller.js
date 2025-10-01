const rentBalansService = require("../../service/rent/rentBalans.service");

class RentBalansController {
    async getAll(req, res, next) {
        try {
            const balans = await rentBalansService.getAll(req, res);
            res.status(200).json(balans);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const newBalans = await rentBalansService.create(req, res);
            res.status(200).json(newBalans);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RentBalansController();