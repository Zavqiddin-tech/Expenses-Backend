const { Schema, model } = require("mongoose");

const rentWithrawSchema = new Schema(
    {
        amount: { type: Number, required: true },
        text: { type: String, required: true },
        user: { type: Schema.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

// 0 - ijara, tokdan tushgan pullar
// 1 - qarzdorlik summasi - necha pul qarzdorlik oshgan

module.exports = model("RentWithdraw", rentWithrawSchema);
