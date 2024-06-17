const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  paid: { type: Boolean, default: false }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);