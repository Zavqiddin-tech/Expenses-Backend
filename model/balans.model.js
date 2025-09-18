const { Schema, model } = require("mongoose");

const balansSchema = new Schema(
  {
    amount: { type: Number, default: 0 },
    user: { type: Schema.ObjectId, ref: "User", required: true },
    category: {
      type: Schema.ObjectId,
      ref: "CategoryBalans",
      required: true,
    },
    history: [{ type: Schema.ObjectId, ref: "Pay" }],
  },
  { timestamps: true }
);

module.exports = model("Balans", balansSchema);
