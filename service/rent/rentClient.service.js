const rentClientModel = require("../../model/rent/rentClient.model");

class RentClientService {
  async getAll(req, res) {
    const allClients = await rentClientModel.find();
    return allClients;
  }
  async getOne(req, res) {
    const client = await rentClientModel
      .findById(req.params.id)
    return client;
  }

  async create(req, res) {
    const clientName = req.body.name.toLowerCase();

    const existingClient = await rentClientModel.findOne({
      name: clientName,
    });

    if (existingClient) {
      throw new Error("Bu mijoz mavjud");
    }

    const newClient = await rentClientModel.create({
      name: clientName,
      user: req.user.id,
    });
    return newClient;
  }

  async update(req, res) {
    const rentClient = await rentClientModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    return rentClient;
  }
}

module.exports = new RentClientService();
