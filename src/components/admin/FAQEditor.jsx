import { useState } from 'react';
import { createFAQ, updateFAQ } from '../../services/faqService';

export default function FAQEditor({ faq, onSave, onCancel }) {
  const [question, setQuestion] = useState(faq?.question || '');
  const [answer, setAnswer] = useState(faq?.answer || '');
  const [category, setCategory] = useState(faq?.category || 'General Information');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'General Information',
    'Academics',
    'Enrollment',
    'Grading',
    'Attendance',
    'Fees and Financial Aid',
    'Campus Services',
    'Student Conduct',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!question.trim() || !answer.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      if (faq) {
        await updateFAQ(faq.id, { question, answer, category });
      } else {
        await createFAQ({ question, answer, category });
      }
      onSave();
    } catch (err) {
      setError(err.message || 'Error saving FAQ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {faq ? 'Edit FAQ' : 'Create New FAQ'}
          </h2>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the FAQ question"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Answer</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the detailed answer"
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
            >
              {loading ? 'Saving...' : faq ? 'Update FAQ' : 'Create FAQ'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
