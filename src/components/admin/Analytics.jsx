import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [topQuestions, setTopQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      // Get all logs
      const logsSnapshot = await getDocs(collection(db, 'queryLogs'));
      const logs = logsSnapshot.docs.map(doc => doc.data());

      // Get FAQs
      const faqsSnapshot = await getDocs(collection(db, 'faqs'));
      const faqs = faqsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Calculate helpful responses
      const helpfulCount = logs.filter(log => log.wasHelpful === true).length;
      const unhelpfulCount = logs.filter(log => log.wasHelpful === false).length;

      // Get most viewed FAQs
      const sorted = [...faqs]
        .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
        .slice(0, 5);

      setStats({
        totalQueries: logs.length,
        totalFAQs: faqs.length,
        helpfulResponses: helpfulCount,
        unhelpfulResponses: unhelpfulCount,
        helpfulRate: logs.length > 0 
          ? ((helpfulCount / (helpfulCount + unhelpfulCount)) * 100).toFixed(1)
          : 0,
        avgViewsPerFAQ: faqs.length > 0
          ? (faqs.reduce((sum, faq) => sum + (faq.viewCount || 0), 0) / faqs.length).toFixed(1)
          : 0,
        totalViewCount: faqs.reduce((sum, faq) => sum + (faq.viewCount || 0), 0)
      });

      setTopQuestions(sorted);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse">Loading analytics...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium">Total Queries</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">{stats.totalQueries}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-medium">Total FAQs</p>
          <p className="text-3xl font-bold text-green-900 mt-2">{stats.totalFAQs}</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-medium">Helpful Rate</p>
          <p className="text-3xl font-bold text-purple-900 mt-2">{stats.helpfulRate}%</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-600 font-medium">Avg Views/FAQ</p>
          <p className="text-3xl font-bold text-orange-900 mt-2">{stats.avgViewsPerFAQ}</p>
        </div>
      </div>

      {/* Feedback Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Response Feedback</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="text-2xl font-bold text-green-600">{stats.helpfulResponses}</div>
            <p className="text-gray-600 text-sm">Helpful Responses</p>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-red-600">{stats.unhelpfulResponses}</div>
            <p className="text-gray-600 text-sm">Unhelpful Responses</p>
          </div>
        </div>
      </div>

      {/* Top FAQs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Viewed FAQs</h3>
        {topQuestions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No FAQ views yet</p>
        ) : (
          <div className="space-y-3">
            {topQuestions.map((faq, index) => (
              <div key={faq.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {index + 1}
                    </span>
                    <p className="font-medium text-gray-800 line-clamp-2">{faq.question}</p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-purple-600">{faq.viewCount || 0}</p>
                  <p className="text-xs text-gray-500">views</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <button
        onClick={loadAnalytics}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ↻ Refresh Analytics
      </button>
    </div>
  );
}
