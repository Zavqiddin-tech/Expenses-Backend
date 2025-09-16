const { Schema, model } = require("mongoose");

const balansSchema = new Schema(
  {
    amount: { type: Number, default: 0 },
    user: { type: Schema.ObjectId, ref: "User", required: true },
    department: {
      type: Number,
      enum: [0],
      required: true,
      default: 0,
    },
    history: [ { type: Schema.ObjectId, ref: "Pay" } ],
  },
  { timestamps: true }
);

module.exports = model("Balans", balansSchema);
