const { Schema, model } = require("mongoose");

const rentBalansSchema = new Schema(
    {
        amount: { type: Number, default: 0 },
        user: { type: Schema.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

module.exports = model("RentBalans", rentBalansSchema);
