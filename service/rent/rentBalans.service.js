const rentBalansModel = require("../../model/rent/rentBalans.model");

class RentBalansService {
    async getAll(req, res) {
        const balans = await rentBalansModel.findOne();
        return balans;
    }

    async create(req, res) {
        const balans = await rentBalansModel.create({user: req.user.id})
        return balans
    }
}

module.exports = new RentBalansService();
