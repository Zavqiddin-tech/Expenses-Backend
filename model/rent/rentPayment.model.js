const { Schema, model } = require("mongoose");

const rentPaymentSchema = new Schema(
    {
        amount: { type: Number, required: true },
        title: { type: String, required: true },
        text: { type: String },
        month: { type: Number, required: true },
        year: { type: Number, required: true },
        user: { type: Schema.ObjectId, ref: "User", required: true },
        categoryId: { type: Schema.ObjectId, ref: "RentCategory" },
        method: {
            type: Number,
            enum: [0, 1],
            required: true,
        }
    },
    { timestamps: true }
);

// 0 - ijaradan tushgan pullar 
// 1 - rahbarga divident berilgan pul, chiqim

module.exports = model("RentPayment", rentPaymentSchema);
