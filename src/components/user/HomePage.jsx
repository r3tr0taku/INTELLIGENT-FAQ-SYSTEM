import { useState, useEffect, useRef } from 'react';
import { queryAI } from '../../services/aiService';
import { searchFAQs, logQuery } from '../../services/faqService';
import ChatDisplay from './ChatDisplay';
import QuestionInput from './QuestionInput';
import FAQCard from './FAQCard';

export default function HomePage() {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [suggestedFAQs, setSuggestedFAQs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setError('');
    setLoading(true);
    
    const userQuestion = question;
    setChatHistory(prev => [...prev, { type: 'user', text: userQuestion, id: Date.now() }]);
    setQuestion('');

    try {
      // Search for relevant FAQs
      const relevantFAQs = await searchFAQs(userQuestion);
      setSuggestedFAQs(relevantFAQs);

      // Get AI response
      const aiResponse = await queryAI(userQuestion, relevantFAQs);

      // Add AI response to chat
      const messageId = Date.now();
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        text: aiResponse,
        relatedFAQs: relevantFAQs,
        id: messageId
      }]);

      // Log query to Firestore
      await logQuery(userQuestion, aiResponse, relevantFAQs);

    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Sorry, there was an error processing your question. Please try again.');
      setChatHistory(prev => [...prev, { 
        type: 'error', 
        text: 'An error occurred while processing your question. Please try again.',
        id: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto py-6 px-4">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-green-700">C</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-800">
                CvSU Student Handbook FAQ
              </h1>
              <p className="text-center text-gray-600 mt-1">
                Ask questions about academic policies, grading, attendance, and more.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Chat History */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex-1 overflow-y-auto max-h-[500px]">
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-lg font-medium">Welcome to CvSU FAQ Assistant</p>
              <p className="mt-2">Ask any question about the student handbook to get started</p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-medium text-green-900">📚 Academics</p>
                  <p className="text-sm text-green-700 mt-1">Policies and requirements</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-medium text-green-900">⏰ Attendance</p>
                  <p className="text-sm text-green-700 mt-1">Policies and guidelines</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {chatHistory.map((msg) => (
                <ChatDisplay key={msg.id} message={msg} />
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-pulse">Thinking</div>
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Suggested FAQs */}
        {suggestedFAQs.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-3">Related from Student Handbook:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedFAQs.map(faq => (
                <FAQCard key={faq.id} faq={faq} />
              ))}
            </div>
          </div>
        )}

        {/* Question Input */}
        <QuestionInput 
          question={question}
          setQuestion={setQuestion}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-4">
        <div className="max-w-4xl mx-auto text-center text-gray-600 text-sm">
          <p>Powered by DeepSeek R1 AI | Cavite State University</p>
        </div>
      </footer>
    </div>
  );
}
