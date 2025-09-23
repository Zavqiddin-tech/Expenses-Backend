const { Schema, model } = require("mongoose");

const expensesSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    user: { type: Schema.ObjectId, ref: "User", required: true },
    category: {
      type: Schema.ObjectId,
      ref: "CategoryExpenses",
      required: true,
    },
    pay: { type: Schema.ObjectId, ref: "Pay", required: true },
    picture: [{ type: String, default: "" }],
  },
  { timestamps: true }
);

module.exports = model("Expenses", expensesSchema);
