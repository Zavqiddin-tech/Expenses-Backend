const { Schema, model } = require("mongoose");

const categoryExpensesSchema = new Schema(
  {
    name: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("CategoryExpenses", categoryExpensesSchema);
