const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activated: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["admin", "director", "manager", "auditor"],
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
