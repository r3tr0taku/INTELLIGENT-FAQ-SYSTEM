import { useState, useEffect } from 'react';
import { getAllFAQs } from '../../services/faqService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import FAQEditor from './FAQEditor';
import FAQTable from './FAQTable';

export default function AdminDashboard() {
  const [faqs, setFaqs] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalFAQs: 0, totalQueries: 0 });
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [admin, navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load FAQs
      const faqsList = await getAllFAQs();
      setFaqs(faqsList);

      // Load stats
      const logsSnapshot = await getDocs(collection(db, 'queryLogs'));
      setStats({
        totalFAQs: faqsList.length,
        totalQueries: logsSnapshot.size
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage FAQ and Monitor Analytics</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              ↻ Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm font-medium">Total FAQs</p>
            <p className="text-4xl font-bold text-green-800 mt-2">{stats.totalFAQs}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm font-medium">Total Queries</p>
            <p className="text-4xl font-bold text-blue-800 mt-2">{stats.totalQueries}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm font-medium">Average Views per FAQ</p>
            <p className="text-4xl font-bold text-purple-800 mt-2">
              {stats.totalFAQs > 0 
                ? (faqs.reduce((sum, faq) => sum + (faq.viewCount || 0), 0) / stats.totalFAQs).toFixed(1)
                : 0
              }
            </p>
          </div>
        </div>

        {/* FAQ Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">FAQs</h2>
            <button
              onClick={() => { setCurrentFAQ(null); setShowEditor(true); }}
              className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition font-medium"
            >
              + Add New FAQ
            </button>
          </div>

          {faqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No FAQs yet. Create your first FAQ to get started.</p>
            </div>
          ) : (
            <FAQTable 
              faqs={faqs} 
              onEdit={(faq) => { setCurrentFAQ(faq); setShowEditor(true); }}
              onDelete={() => loadData()}
            />
          )}
        </div>
      </main>

      {/* FAQ Editor Modal */}
      {showEditor && (
        <FAQEditor
          faq={currentFAQ}
          onSave={() => {
            setShowEditor(false);
            loadData();
          }}
          onCancel={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}
