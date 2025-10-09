const BaseError = require("../errors/base.error");

module.exports = function (req, res, next) {
    try {
        if (req.user.role !== "director") {
            return next(BaseError.ForBidden("sizga mumkin emas !"));
        }
        next();
    } catch (error) {
        return next(BaseError.UnauthorizedError());
    }
};
