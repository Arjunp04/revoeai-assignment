import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  columns: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["Text", "Date"],
        default: "Text",
      },
    },
  ],
  rows: [
    {
      values: { type: Map, of: mongoose.Schema.Types.Mixed }, // Dynamic key-value storage
    },
  ],
});

export default mongoose.models.Table || mongoose.model("Table", TableSchema);
