import React, { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/conversations`)
      .then(res => res.json())
      .then(setConversations);
  }, []);

  useEffect(() => {
    if (selected) {
      fetch(`${API_URL}/messages/${selected.wa_id}`)
        .then(res => res.json())
        .then(setMessages);
    }
  }, [selected]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selected) return;
    const res = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wa_id: selected.wa_id,
        name: selected.name,
        number: selected.number,
        message: input,
      }),
    });
    const newMsg = await res.json();
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Chats</h2>
        <ul>
          {conversations.map(conv => (
            <li
              key={conv._id}
              className={selected && selected.wa_id === conv._id ? 'active' : ''}
              onClick={() => setSelected({ wa_id: conv._id, name: conv.name, number: conv.number })}
            >
              <div className="chat-title">{conv.name || conv.number}</div>
              <div className="chat-last">{conv.lastMessage}</div>
            </li>
          ))}
        </ul>
      </aside>
      <main className="chat-area">
        {selected ? (
          <>
            <header className="chat-header">
              <div>{selected.name || selected.number}</div>
              <div className="chat-number">{selected.number}</div>
            </header>
            <div className="messages-list">
              {messages.map(msg => (
                <div key={msg.id} className={`message message-${msg.status}`}>
                  <div className="msg-text">{msg.message}</div>
                  <div className="msg-meta">
                    <span>{new Date(msg.timestamp).toLocaleString()}</span>
                    <span className="msg-status">{msg.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <form className="send-form" onSubmit={handleSend}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className="no-chat">Select a chat to start messaging</div>
        )}
      </main>
    </div>
  );
}

export default App;
