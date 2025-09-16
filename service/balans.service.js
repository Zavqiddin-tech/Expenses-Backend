const balansModel = require("../model/balans.model");

class BalansService {
  async getAll(req, res) {
    const balans = await balansModel.findOne();
    return balans;
  }

  async create(req, res) {}
}

module.exports = new BalansService();
