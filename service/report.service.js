const payModel = require("../model/pay.model")

class ReportService {
    async thisMonth(req, res) {
        const year = parseInt(req.query.year)
        const month = parseInt(req.query.month)

        const monthStart = new Date(year, month, 1)
        const monthFinish = new Date(year, month + 1, 1)

        const data = await payModel.aggregate([
            {
                $match: {
                    method: { $in: [ 0, 1] },
                    createdAt: {
                        $gte: monthStart,
                        $lt: monthFinish,
                    }
                },
            },
            {
                $group: {
                    _id: "$method",
                    total: { $sum: "$amount" }
                }
            }
        ])

        const result = {kirim: 0, chiqim: 0}
        for (let e of data) {
            if(e._id === 0) {
                result.kirim = e.total
            }
            if(e._id === 1) {
                result.chiqim = e.total
            }
        }
        return result;
    }
    async chooseDate(req, res) {
        const day = parseInt(req.query.day)
        const month = parseInt(req.query.month)
        const year = parseInt(req.query.year)

        const monthFinish = new Date(year, month - 1, day + 1)

        const data = await payModel.aggregate([
            {
                $match: {
                    method: { $in: [ 0, 1] },
                    createdAt: {
                        $lt: monthFinish,
                    }
                },
            },
            {
                $group: {
                    _id: "$method",
                    total: { $sum: "$amount" }
                }
            }
        ])

        const state = {kirim: 0, chiqim: 0}
        for (let e of data) {
            if(e._id === 0) {
                state.kirim = e.total
            }
            if(e._id === 1) {
                state.chiqim = e.total
            }
        }

        const sum = state.kirim - state.chiqim
        return sum;
    }
}

module.exports = new ReportService()