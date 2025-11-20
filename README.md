# CvSU Student Handbook Intelligent FAQ System

A full-stack web application that serves as an intelligent FAQ system for Cavite State University's Student Handbook. The system uses **DeepSeek R1 AI Model** via OpenRouter API and **Firebase** as the backend.

## 🌟 Features

- ✅ **Intelligent AI Responses** - Uses DeepSeek R1 via OpenRouter for context-aware answers
- ✅ **Firebase Authentication** - Secure admin login system
- ✅ **Real-time Database** - Firestore for FAQ storage and management
- ✅ **Query Logging** - Tracks all student questions for analytics
- ✅ **Admin Dashboard** - Comprehensive FAQ management interface
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Category Organization** - FAQs organized by topics
- ✅ **Search Functionality** - Keyword-based FAQ search
- ✅ **View Analytics** - Track FAQ popularity and usage

## 🛠 Technology Stack

### Frontend
- **React 18** - User interface framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool and dev server

### Backend & Infrastructure
- **Firebase** - Backend as a Service
  - **Authentication** - Email/password auth
  - **Firestore** - NoSQL database
  - **Hosting** - Static site hosting
- **OpenRouter API** - AI model gateway
  - **DeepSeek R1** - Free AI model for responses

## 📋 Prerequisites

- Node.js 16+ and npm
- Firebase project with Firestore and Authentication enabled
- OpenRouter API key (free tier available)
- Git (optional)

## 🚀 Quick Start

### 1. Setup Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project named "cvsu-faq"
3. Enable **Authentication** (Email/Password)
4. Create a **Firestore Database** (Start in test mode)
5. Copy your Firebase config credentials

### 2. Get OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Sign up and create an account
3. Copy your API key from the dashboard
4. The free tier includes access to DeepSeek R1

### 3. Clone and Setup Project

```bash
# Clone the repository
git clone <repository-url>
cd cvsu-faq-system

# Install dependencies
npm install

# Create .env file with your credentials
cp .env.example .env
```

### 4. Configure Environment Variables

Edit `.env` with your Firebase and API credentials:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=cvsu-faq.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cvsu-faq
VITE_FIREBASE_STORAGE_BUCKET=cvsu-faq.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# OpenRouter API
VITE_OPENROUTER_API_KEY=sk-or-v1-xxxxxxxx...
```

### 5. Setup Firestore Security Rules

1. Go to Firestore > Rules in Firebase Console
2. Replace with contents from `firestore.rules`
3. Publish rules

### 6. Create Admin User

In Firebase Console > Authentication:

1. Add a new user with email: `demo@cvsu.edu.ph`
2. Set password: `demo123456`
3. Copy the User ID (UID)

In Firestore > Collections > admins:

1. Create document with ID = User UID
2. Add fields:
   ```json
   {
     "role": "admin",
     "email": "demo@cvsu.edu.ph",
     "displayName": "Demo Admin"
   }
   ```

### 7. Import Initial FAQs

```bash
npm run import-faqs
```

This imports 10 sample FAQs from `data/faqs.json` into Firestore.

### 8. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
cvsu-faq-system/
├── src/
│   ├── components/
│   │   ├── user/
│   │   │   ├── HomePage.jsx           # Main chat interface
│   │   │   ├── ChatDisplay.jsx        # Chat message display
│   │   │   ├── FAQCard.jsx            # FAQ card component
│   │   │   └── QuestionInput.jsx      # Input form
│   │   └── admin/
│   │       ├── AdminLogin.jsx         # Login page
│   │       ├── AdminDashboard.jsx     # Dashboard main
│   │       ├── FAQEditor.jsx          # FAQ editor modal
│   │       └── FAQTable.jsx           # FAQ table display
│   ├── services/
│   │   ├── aiService.js              # OpenRouter API integration
│   │   └── faqService.js             # Firestore operations
│   ├── hooks/
│   │   └── useAuth.js                # Authentication context
│   ├── config/
│   │   └── firebase.js               # Firebase initialization
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
├── public/
│   └── index.html                    # HTML template
├── data/
│   └── faqs.json                     # Initial FAQ data
├── scripts/
│   └── importFAQs.js                 # FAQ import script
├── .env.example                      # Environment template
├── firebase.json                     # Firebase config
├── firestore.rules                   # Firestore security rules
├── package.json                      # Dependencies
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind configuration
└── README.md                         # This file
```

## 🗄 Firestore Database Structure

### Collections

#### `faqs/` - Frequently Asked Questions
```json
{
  "id": "auto-generated",
  "question": "What is the full name of the university?",
  "answer": "The university is called Cavite State University (CvSU).",
  "category": "General Information",
  "keywords": ["university", "name", "cavite"],
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z",
  "viewCount": 0
}
```

#### `admins/` - Admin Users
```json
{
  "uid": "firebase-auth-uid",
  "email": "admin@cvsu.edu.ph",
  "role": "admin",
  "displayName": "Admin User"
}
```

#### `queryLogs/` - Query History
```json
{
  "question": "What are admission requirements?",
  "answer": "AI response...",
  "relatedFAQCount": 3,
  "timestamp": "2024-01-01T12:00:00Z",
  "wasHelpful": true,
  "userId": "anonymous"
}
```

## 🔐 Security Rules

The `firestore.rules` file implements:
- **Public read** on FAQs (anyone can view)
- **Admin-only write** on FAQs (only admins can create/edit)
- **Anonymous logging** for queries
- **Admin-only analytics** access

## 🌐 Deployment

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Build the app
npm run build

# Deploy
firebase deploy

# View live app
firebase open hosting:site
```

The app will be available at: `https://cvsu-faq-web.web.app`

### Alternative: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Configure build command: npm run build
# Configure output directory: dist
```

## 📝 Adding More FAQs

### Method 1: Admin Dashboard
1. Navigate to `/admin/dashboard`
2. Login with admin credentials
3. Click "Add New FAQ"
4. Fill in question, answer, and category
5. Click "Create FAQ"

### Method 2: Bulk Import
1. Add FAQs to `data/faqs.json`
2. Run `npm run import-faqs`

### Method 3: Manual Firebase Entry
1. Open Firebase Console > Firestore
2. Create new document in `faqs` collection
3. Add required fields

## 🧪 Testing

### Test User Flow
1. Open `http://localhost:3000`
2. Ask questions about the CvSU handbook
3. View suggested FAQs
4. Check helpful feedback

### Test Admin Flow
1. Navigate to `http://localhost:3000/admin/login`
2. Use demo credentials
3. Create/edit/delete FAQs
4. View analytics

## 🐛 Troubleshooting

### API Key Issues
- Ensure `.env` file is created and not in `.gitignore`
- Verify OpenRouter API key is valid
- Check Firebase credentials are correct

### CORS Errors
- OpenRouter should handle CORS automatically
- Check browser console for specific errors
- Ensure HTTP-Referer header is set (included in code)

### Firestore Errors
- Check security rules are deployed correctly
- Verify user is authenticated before admin operations
- Check Firestore database is in read/write mode

### Build Errors
- Clear `node_modules` and `dist` directories
- Run `npm install` again
- Check Node.js version (16+)

## 📚 FAQ Categories

- **General Information** - University details
- **Academics** - Academic policies
- **Enrollment** - Admission and registration
- **Grading** - Grading system
- **Attendance** - Attendance policies
- **Fees and Financial Aid** - Tuition and scholarships
- **Campus Services** - Student support services
- **Student Conduct** - Code of conduct
- **Other** - Miscellaneous

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [OpenRouter API](https://openrouter.ai)
- [DeepSeek Model](https://github.com/deepseek-ai)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Firebase logs
3. Check OpenRouter API status
4. Open an issue on GitHub

## 🎯 Future Enhancements

- [ ] Multi-language support
- [ ] Voice input for questions
- [ ] Chat history export
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced analytics dashboard
- [ ] Integration with Google Drive for FAQ backup
- [ ] Mobile app (React Native)
- [ ] Teacher/Student distinction
- [ ] File attachment support

---

**Built with ❤️ for Cavite State University Students**
