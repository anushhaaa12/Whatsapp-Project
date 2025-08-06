const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/whatsapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import routes
const messagesRouter = require('./routes/messages');
app.use('/api', messagesRouter);

// Health check route
app.get('/', (req, res) => {
  res.send('WhatsApp Clone Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});