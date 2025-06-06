export default function Message({ message }) {
  return (
    <div className="bg-gray-50 p-2 rounded border">
      <div className="text-sm text-gray-600">
        <span className="font-semibold">{message.author}</span> • {message.date}
      </div>
      <div className="font-semibold">{message.subject}</div>
      <div>{message.content}</div>
    </div>
  );
}
