import { useState } from 'react';
import Thread from './Thread';

export default function Category({ category }) {
  const [selectedForum, setSelectedForum] = useState(null);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
      <div className="space-x-2 mb-4">
        {category.forums.map(forum => (
          <button
            key={forum.id}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            onClick={() => setSelectedForum(forum)}
          >
            {forum.name}
          </button>
        ))}
      </div>
      {selectedForum && (
        <div>
          <h3 className="text-lg font-medium">{selectedForum.name}</h3>
          {selectedForum.threads.map(thread => (
            <Thread key={thread.id} thread={thread} />
          ))}
        </div>
      )}
    </div>
  );
}
