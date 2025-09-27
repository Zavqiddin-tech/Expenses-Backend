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
}

module.exports = new InvestController();