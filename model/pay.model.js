const { Schema, model } = require("mongoose");

const paySchema = new Schema(
  {
    amount: { type: Number, required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },
		method: {
      type: Number,
      enum: [0, 1],
      required: true,
    }
  },
  { timestamps: true }
);

// 0 - kirim, 1 - chiqim

module.exports = model("Pay", paySchema);
