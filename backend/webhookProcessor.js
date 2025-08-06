const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const ProcessedMessage = require('./models/ProcessedMessage');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://anushhaaa12:%40Nusha12%21@cluster0.syfn8y6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  processPayloads();
});

async function processPayloads() {
  try {
    const payloadDir = path.join(__dirname, 'payloads', 'whatsapp sample payloads');
    const files = fs.readdirSync(payloadDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const data = JSON.parse(fs.readFileSync(path.join(payloadDir, file), 'utf-8'));
        // Navigate to metaData.entry[].changes[]
        const entries = data.metaData?.entry || [];
        for (const entry of entries) {
          const changes = entry.changes || [];
          for (const change of changes) {
            if (change.field === 'messages' && change.value) {
              const contacts = change.value.contacts || [];
              const messages = change.value.messages || [];
              for (const msg of messages) {
                const wa_id = contacts[0]?.wa_id || '';
                const name = contacts[0]?.profile?.name || '';
                await ProcessedMessage.updateOne(
                  { id: msg.id },
                  {
                    $set: {
                      id: msg.id,
                      wa_id,
                      name,
                      number: msg.from,
                      message: msg.text?.body || '',
                      timestamp: new Date(parseInt(msg.timestamp) * 1000),
                      status: 'sent',
                      meta_msg_id: msg.id,
                    },
                  },
                  { upsert: true }
                );
                console.log(`Processed message: ${msg.id}`);
              }
            }
          }
        }
      }
    }
    console.log('All payloads processed.');
    process.exit(0);
  } catch (err) {
    console.error('Error processing payloads:', err);
    process.exit(1);
  }
}
