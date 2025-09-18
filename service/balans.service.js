const balansModel = require("../model/balans.model");

class BalansService {
  async getAll(req, res) {
    const balans = await balansModel.findOne();
    return balans;
  }

  async create(req, res) {
    /* const balans = await balansModel.create({user: req.user.id})
    return balans */
  }
}

module.exports = new BalansService();
