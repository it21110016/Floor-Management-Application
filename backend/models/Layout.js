const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableId: { type: String, required: true },
  name: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  size: {
    width: { type: Number, default: 70 },
    height: { type: Number, default: 70 },
  },
  rotation: { type: Number, default: 0 },
  minCovers: { type: Number, default: 1 },
  maxCovers: { type: Number, default: 1 },
  online: { type: Boolean, default: true },
});

const layoutSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  tables: [tableSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Layout", layoutSchema);
