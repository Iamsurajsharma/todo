const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    title: { type: Schema.Types.String, required: true },
    isDone: { type: Schema.Types.Boolean, default: false },
  },
  {
    versionKey: false,
    collection: "task",
    timestamps: true,
  }
);

module.exports = model("task", taskSchema);
