const expensesService = require("../service/expenses.service");

class ExpensesController {
	async getAll(req, res, next) {
		try {
			const allExpensess = await expensesService.getAll(req, res);
			res.status(200).json(allExpensess);
		} catch (error) {
			next(error);
		}
	}
	async getByCategory(req, res, next) {
		try {
			const expenses = await expensesService.getByCategory(req, res);
			res.status(200).json(expenses);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const newExpenses = await expensesService.create(req, res);
			res.status(200).json(newExpenses);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new ExpensesController();