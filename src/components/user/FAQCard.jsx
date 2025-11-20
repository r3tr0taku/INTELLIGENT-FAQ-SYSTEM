export default function FAQCard({ faq }) {
  return (
    <div className="bg-green-700 text-white p-4 rounded-lg hover:bg-green-800 transition cursor-pointer">
      <p className="font-medium text-sm mb-1">{faq.category || 'General'}</p>
      <p className="text-sm line-clamp-2">{faq.question}</p>
      <p className="text-xs text-green-100 mt-2">Views: {faq.viewCount || 0}</p>
    </div>
  );
}
