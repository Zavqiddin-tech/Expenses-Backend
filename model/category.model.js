const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
