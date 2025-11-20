export default function QuestionInput({ question, setQuestion, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        disabled={loading}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={loading || !question.trim()}
        className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
