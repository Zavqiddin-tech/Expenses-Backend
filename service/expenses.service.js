const expensesModel = require("../model/expenses.model");
const fileService = require("./file.service");

class ExpensesService {
	async getAll(req, res) {
		const limit = parseInt(req.query.limit);

		const allExpensess = await expensesModel
			.find({ user: req.user.id })
			.sort({ createdAt: -1 })
			.limit(limit);
		return allExpensess;
	}

	async create(req, res) {
		const fileName = fileService.save(req.files);
		const newExpenses = await expensesModel.create({
			...req.body,
			picture: Array.isArray(fileName) ? fileName : [...fileName],
			user: req.user.id,
		});
		console.log(newExpenses);
		return newExpenses;
	}
}

module.exports = new ExpensesService();
