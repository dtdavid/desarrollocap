// src/components/Thread.jsx
import { useState } from 'react';
import Message from './Message';
import Editor from './Editor';

export default function Thread({ thread }) {
  const [messages, setMessages] = useState(thread.messages);
  const [replying, setReplying] = useState(false);

  const handleReply = (message) => {
    const newMessage = {
      id: messages.length + 1,
      author: 'Tú',
      date: new Date().toISOString().split('T')[0],
      ...message
    };
    setMessages([...messages, newMessage]);
    setReplying(false);
  };

  return (
    <div className="border-t mt-4 pt-4">
      <h4 className="text-md font-semibold mb-2">{thread.title}</h4>
      <div className="space-y-2">
        {messages.map(msg => (
          <Message key={msg.id} message={msg} />
        ))}
      </div>
      {replying ? (
        <Editor onSubmit={handleReply} onCancel={() => setReplying(false)} />
      ) : (
        <button
          onClick={() => setReplying(true)}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          Responder
        </button>
      )}
    </div>
  );
}
