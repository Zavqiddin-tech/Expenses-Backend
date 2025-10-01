const { Schema, model } = require("mongoose");

const rentCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, default: 0},
    user: { type: Schema.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("RentCategory", rentCategorySchema);
