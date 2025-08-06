const mongoose = require('mongoose');

const ProcessedMessageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // message id
  wa_id: { type: String, required: true }, // user id
  name: { type: String },
  number: { type: String },
  message: { type: String, required: true },
  timestamp: { type: Date, required: true },
  status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
  meta_msg_id: { type: String }, // for status updates
});

module.exports = mongoose.model('ProcessedMessage', ProcessedMessageSchema);