const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // e.g., single, double, suite
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', RoomSchema);