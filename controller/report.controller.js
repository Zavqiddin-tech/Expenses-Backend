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
    async percent(req, res, next) {
        try {
            const percent = await reportService.percent(req, res);
            res.status(200).json(percent);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new InvestController();