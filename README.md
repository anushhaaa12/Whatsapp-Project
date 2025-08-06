# WhatsApp Web Clone

A full-stack WhatsApp Web-like chat interface that displays real-time WhatsApp conversations using webhook data. Built with Node.js, React, and MongoDB.

## 🚀 Features

- **WhatsApp-like UI**: Clean, responsive interface mimicking WhatsApp Web
- **Real-time Chat Display**: Show conversations grouped by user
- **Message Status**: Display sent, delivered, and read status indicators
- **Send Message Demo**: Add new messages to conversations (for demo purposes)
- **Webhook Processing**: Process WhatsApp Business API webhook payloads
- **Mobile Responsive**: Works seamlessly on mobile and desktop

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **CSS3** - Styling (WhatsApp-like design)

## 📁 Project Structure

```
whatsapp project/
├── backend/
│   ├── models/
│   │   ├── ProcessedMessage.js
│   │   └── StatusUpdate.js
│   ├── routes/
│   │   └── messages.js
│   ├── payloads/
│   │   └── whatsapp sample payloads/
│   ├── server.js
│   └── webhookProcessor.js
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   └── public/
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd whatsapp project
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up MongoDB**
   - Start local MongoDB server, or
   - Use MongoDB Atlas (cloud)

5. **Process sample payloads**
   ```bash
   cd ../backend
   node webhookProcessor.js
   ```

6. **Start the backend server**
   ```bash
   node server.js
   ```
   Server runs on: `http://localhost:5000`

7. **Start the frontend**
   ```bash
   cd ../frontend
   npm start
   ```
   App opens at: `http://localhost:3000`

## 📡 API Endpoints

### Conversations
- `GET /api/conversations` - Get all conversations grouped by user

### Messages
- `GET /api/messages/:wa_id` - Get messages for a specific conversation
- `POST /api/messages` - Send a new message (demo)
- `PATCH /api/messages/:id/status` - Update message status

## 🗄️ Database Schema

### ProcessedMessage
```javascript
{
  id: String,           // Message ID
  wa_id: String,        // User ID
  name: String,         // User name
  number: String,       // Phone number
  message: String,      // Message content
  timestamp: Date,      // Message timestamp
  status: String,       // 'sent', 'delivered', 'read'
  meta_msg_id: String   // For status updates
}
```

## 🌐 Deployment

### Netlify Deployment

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Add environment variable: `REACT_APP_API_URL=https://your-backend-url.com/api`

3. **Backend Deployment**
   - Deploy backend to Render, Railway, or Heroku
   - Update frontend API URL to point to deployed backend

### Environment Variables

**Frontend (.env)**
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/whatsapp
PORT=5000
```

## 📱 Features Demo

- **Chat List**: View all conversations in the sidebar
- **Message Display**: Click any chat to view messages with timestamps
- **Status Indicators**: See message status (sent, delivered, read)
- **Send Messages**: Type and send new messages (demo functionality)
- **Responsive Design**: Works on mobile and desktop

## 🔧 Development

### Running Locally
1. Start MongoDB
2. Run `node webhookProcessor.js` to populate database
3. Start backend: `node server.js`
4. Start frontend: `npm start`

### Adding Sample Data
Place WhatsApp webhook payload JSON files in `backend/payloads/whatsapp sample payloads/` and run the webhook processor.

## 📝 License

This project is created for educational purposes as part of a full-stack development evaluation task.

## 🤝 Contributing

This is a demo project for evaluation purposes. Feel free to fork and modify for your own learning.

---

**Live Demo**: [Your Netlify URL here]
**Backend API**: [Your Backend URL here]
