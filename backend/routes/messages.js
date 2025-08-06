const express = require('express');
const router = express.Router();
const ProcessedMessage = require('../models/ProcessedMessage');

// Get all conversations (grouped by wa_id)
router.get('/conversations', async (req, res) => {
  try {
    const conversations = await ProcessedMessage.aggregate([
      {
        $group: {
          _id: '$wa_id',
          name: { $first: '$name' },
          number: { $first: '$number' },
          lastMessage: { $last: '$message' },
          lastTimestamp: { $last: '$timestamp' },
        },
      },
      { $sort: { lastTimestamp: -1 } },
    ]);
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages for a conversation (by wa_id)
router.get('/messages/:wa_id', async (req, res) => {
  try {
    const messages = await ProcessedMessage.find({ wa_id: req.params.wa_id }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a new message (demo)
router.post('/messages', async (req, res) => {
  try {
    const { wa_id, name, number, message } = req.body;
    const newMsg = await ProcessedMessage.create({
      id: Date.now().toString(),
      wa_id,
      name,
      number,
      message,
      timestamp: new Date(),
      status: 'sent',
    });
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update message status
router.patch('/messages/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await ProcessedMessage.findOneAndUpdate(
      { id: req.params.id },
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;