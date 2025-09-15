const { Schema, model } = require("mongoose");

const expensesSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },
    category: { type: Schema.ObjectId, ref: "Category", required: true },
    pay: { type: Schema.ObjectId, ref: "Pay", required: true },
    picture: [{ type: String, default: "" }],
  },
  { timestamps: true }
);

module.exports = model("Expenses", expensesSchema);
