const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    email: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
  },
  {
    versionKey: false,
    collection: "user",
    timestamps: true,
  }
);

module.exports = model("user", userSchema);
