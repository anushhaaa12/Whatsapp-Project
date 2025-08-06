const mongoose = require('mongoose');

const StatusUpdateSchema = new mongoose.Schema({
  meta_msg_id: { type: String, required: true },
  status: { type: String, enum: ['sent', 'delivered', 'read'], required: true },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model('StatusUpdate', StatusUpdateSchema);