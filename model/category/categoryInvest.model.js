const { Schema, model } = require("mongoose");

const categoryInvestSchema = new Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, default: 0},
    user: { type: Schema.ObjectId, ref: "User", required: true },
    history: [{ type: Schema.ObjectId, ref: "Pay" }]
  },
  { timestamps: true }
);

module.exports = model("CategoryInvest", categoryInvestSchema);
