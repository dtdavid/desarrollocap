
import { useState } from 'react';

export default function Editor({ onSubmit, onCancel }) {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (subject && content) {
      onSubmit({ subject, content });
      setSubject('');
      setContent('');
    }
  };

  return (
    <div className="mt-2 space-y-2">
      <input
        type="text"
        placeholder="Asunto"
        className="w-full border p-1 rounded"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Escribe tu mensaje..."
        className="w-full border p-1 rounded"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="space-x-2">
        <button onClick={handleSubmit} className="bg-green-500 text-white px-3 py-1 rounded">Enviar</button>
        <button onClick={onCancel} className="text-gray-600 hover:underline">Cancelar</button>
      </div>
    </div>
  );
}
