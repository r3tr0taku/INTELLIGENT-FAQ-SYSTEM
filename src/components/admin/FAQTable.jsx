import { deleteFAQ } from '../../services/faqService';
import { useState } from 'react';

export default function FAQTable({ faqs, onEdit, onDelete }) {
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id, question) => {
    if (!window.confirm(`Delete FAQ: "${question.substring(0, 50)}..."`)) return;

    setDeleting(id);
    try {
      await deleteFAQ(id);
      onDelete();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Error deleting FAQ');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Question</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Views</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id} className="border-b hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-800">
                <p className="line-clamp-2">{faq.question}</p>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {faq.category || 'General'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {faq.viewCount || 0}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {faq.createdAt 
                  ? new Date(faq.createdAt.toDate()).toLocaleDateString()
                  : 'N/A'
                }
              </td>
              <td className="px-6 py-4 text-sm space-x-2">
                <button
                  onClick={() => onEdit(faq)}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(faq.id, faq.question)}
                  disabled={deleting === faq.id}
                  className="text-red-600 hover:text-red-800 hover:underline transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting === faq.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
