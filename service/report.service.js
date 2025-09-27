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
                        $lte: monthFinish,
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
            } else {
                result.chiqim = e.total
            }
        }
        return result;
    }
}

module.exports = new ReportService()