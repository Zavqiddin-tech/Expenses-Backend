const reportService = require("../service/report.service");

class InvestController {
    async thisMonth(req, res, next) {
        try {
            const thisMonth = await reportService.thisMonth(req, res);
            res.status(200).json(thisMonth);
        } catch (error) {
            next(error);
        }
    }
    async chooseDate(req, res, next) {
        try {
            const chooseDate = await reportService.chooseDate(req, res);
            res.status(200).json(chooseDate);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new InvestController();