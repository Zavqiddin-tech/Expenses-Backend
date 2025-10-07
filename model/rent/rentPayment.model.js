const { Schema, model } = require("mongoose");

const rentPaymentSchema = new Schema(
    {
        amount: { type: Number, required: true },
        title: { type: String, required: true },
        text: { type: String },
        month: { type: Number, required: true },
        year: { type: Number, required: true },
        user: { type: Schema.ObjectId, ref: "User", required: true },
        clientId: { type: Schema.ObjectId, ref: "RentClient" },
        method: {
            type: Number,
            enum: [0, 1, 2],
            required: true,
        }
    },
    { timestamps: true }
);

// 0 - ijara, tokdan tushgan pullar
// 1 - qarzdorlik summasi - necha pul qarzdorlik oshgan
// 2 - rahbarga divident berilgan pul, chiqim

module.exports = model("RentPayment", rentPaymentSchema);
