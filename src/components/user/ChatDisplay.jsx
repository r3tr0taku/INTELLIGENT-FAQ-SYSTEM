export default function ChatDisplay({ message }) {
  const isUser = message.type === 'user';
  const isError = message.type === 'error';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] p-4 rounded-lg ${
        isUser 
          ? 'bg-green-700 text-white rounded-br-none' 
          : isError
          ? 'bg-red-100 text-red-800 rounded-bl-none border border-red-300'
          : 'bg-gray-100 text-gray-800 rounded-bl-none'
      }`}>
        <p className="whitespace-pre-wrap">{message.text}</p>
        
        {message.relatedFAQs && message.relatedFAQs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-sm font-medium mb-2">Referenced from handbook:</p>
            <ul className="text-sm space-y-1">
              {message.relatedFAQs.map((faq, idx) => (
                <li key={idx} className="text-gray-600">• {faq.category || 'General'}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
