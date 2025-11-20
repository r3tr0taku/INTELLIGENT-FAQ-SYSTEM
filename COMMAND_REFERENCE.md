# 📋 CvSU FAQ System - Command Reference & File Locations

## 🎯 Quick Command Reference

### Installation & Setup
```bash
# Install all dependencies
npm install

# Copy environment template
cp .env.example .env

# Import sample FAQs into Firestore
npm run import-faqs
```

### Development
```bash
# Start development server (auto-opens browser)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Deployment
```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy everything to Firebase
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only Firestore rules
firebase deploy --only firestore:rules

# View live site
firebase open hosting:site
```

### Useful npm Scripts
```bash
# All available scripts (defined in package.json)
npm run dev              # Development server
npm run build            # Production build
npm run preview          # Preview build
npm run import-faqs      # Import FAQ data
```

---

## 📁 Complete File Structure

### Root Directory Files
```
/
├── package.json                 - Dependencies, scripts, metadata
├── vite.config.js               - Vite build configuration
├── tailwind.config.js           - Tailwind CSS themes & colors
├── postcss.config.js            - CSS processing configuration
├── firebase.json                - Firebase hosting configuration
├── firestore.rules              - Firestore security rules
├── .gitignore                   - Git ignore patterns
├── .env.example                 - Environment template (copy to .env)
├── .env.template                - Detailed env configuration
├── index.html                   - Main HTML file
└── .git/                        - Git repository data
```

### Source Code Files (`/src`)
```
/src/
├── main.jsx                     - Application entry point
├── App.jsx                      - Main app with routing
├── index.css                    - Global styles
│
├── /config
│   └── firebase.js              - Firebase initialization & exports
│
├── /hooks
│   └── useAuth.js               - Authentication context & hook
│
├── /services
│   ├── aiService.js             - OpenRouter AI integration
│   │   ├── queryAI()            - Query DeepSeek R1
│   │   └── extractKeywords()    - Keyword extraction
│   │
│   └── faqService.js            - Firestore operations
│       ├── searchFAQs()         - Search by keywords
│       ├── getAllFAQs()         - Get all FAQs
│       ├── createFAQ()          - Create new FAQ
│       ├── updateFAQ()          - Update FAQ
│       ├── deleteFAQ()          - Delete FAQ
│       ├── logQuery()           - Log user query
│       ├── incrementViewCount() - Track views
│       ├── markFeedback()       - Record feedback
│       └── getFAQsByCategory()  - Filter by category
│
└── /components
    ├── /user
    │   ├── HomePage.jsx         - Main chat interface
    │   ├── ChatDisplay.jsx      - Chat message component
    │   ├── FAQCard.jsx          - FAQ card component
    │   └── QuestionInput.jsx    - Question input form
    │
    └── /admin
        ├── AdminLogin.jsx       - Login page
        ├── AdminDashboard.jsx   - Main admin dashboard
        ├── FAQEditor.jsx        - FAQ editor modal
        ├── FAQTable.jsx         - FAQ list table
        └── Analytics.jsx        - Analytics dashboard
```

### Data & Scripts Files
```
/data
└── faqs.json                    - 10 sample FAQs for import

/scripts
└── importFAQs.js                - Script to import FAQs to Firestore
```

### Documentation Files
```
/
├── README.md                    - Main project documentation
├── SETUP_GUIDE.md               - Step-by-step setup instructions
├── QUICK_REFERENCE.md           - Quick commands & reference
├── DEPLOYMENT_CHECKLIST.md      - Pre-deployment checklist
├── PROJECT_COMPLETE.md          - Completion summary
├── FILE_INDEX.md                - Complete file reference
├── ARCHITECTURE.md              - System architecture
└── IMPLEMENTATION_SUMMARY.md    - This implementation summary
```

---

## 🔑 Critical Files to Configure

### 1. `.env` File (Required)
**Location:** Root directory
**Template:** `.env.example`

```bash
# Steps to create
cp .env.example .env
# Edit .env and fill in values
```

**Required values:**
```env
VITE_FIREBASE_API_KEY=YOUR_VALUE
VITE_FIREBASE_AUTH_DOMAIN=YOUR_VALUE
VITE_FIREBASE_PROJECT_ID=YOUR_VALUE
VITE_FIREBASE_STORAGE_BUCKET=YOUR_VALUE
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_VALUE
VITE_FIREBASE_APP_ID=YOUR_VALUE
VITE_OPENROUTER_API_KEY=YOUR_VALUE
```

### 2. `firestore.rules` (Deploy to Firebase)
**Location:** Root directory
**Action:** Copy content to Firebase Console > Firestore > Rules

### 3. `firebase.json` (Firebase Configuration)
**Location:** Root directory
**Purpose:** Defines Firebase hosting and Firestore settings

### 4. `package.json` (Dependencies)
**Location:** Root directory
**Action:** `npm install` reads this file

---

## 🗂️ Component File Locations

### Public User Components
```
src/components/user/HomePage.jsx
├─ Entry point for students
├─ Main chat interface
├─ Imports: ChatDisplay, FAQCard, QuestionInput
└─ Services: aiService, faqService

src/components/user/ChatDisplay.jsx
├─ Displays individual messages
├─ Shows AI responses and user questions
└─ Displays related FAQ references

src/components/user/FAQCard.jsx
├─ Card component for FAQ suggestions
├─ Shows: category, question, views
└─ Used in HomePage for related FAQs

src/components/user/QuestionInput.jsx
├─ Input form component
├─ Question text input
└─ Send button
```

### Admin Components
```
src/components/admin/AdminLogin.jsx
├─ Login page for admins
├─ Email & password input
└─ Demo credentials display

src/components/admin/AdminDashboard.jsx
├─ Main admin interface
├─ Statistics display
├─ FAQ management
├─ Logout button
└─ Imports: FAQEditor, FAQTable, Analytics

src/components/admin/FAQTable.jsx
├─ Table displaying all FAQs
├─ Edit & Delete buttons
└─ Columns: question, category, views, created date

src/components/admin/FAQEditor.jsx
├─ Modal for creating/editing FAQs
├─ Fields: question, answer, category
└─ Save/Cancel buttons

src/components/admin/Analytics.jsx
├─ Analytics dashboard
├─ Key metrics & statistics
├─ Most viewed FAQs
└─ Helpful responses graph
```

---

## 🔧 Service Files

### AI Service (`src/services/aiService.js`)
```javascript
// Export functions
export const queryAI(userQuestion, relevantFAQs)
export const extractKeywords(text)

// Used by: HomePage.jsx
// Connects to: OpenRouter API → DeepSeek R1
```

### FAQ Service (`src/services/faqService.js`)
```javascript
// Export functions
export const searchFAQs(searchText)
export const getAllFAQs()
export const createFAQ(faqData)
export const updateFAQ(id, faqData)
export const deleteFAQ(id)
export const logQuery(question, answer, faqs)
export const incrementViewCount(faqId)
export const markFeedback(queryLogId, isHelpful)
export const getFAQsByCategory(category)

// Connects to: Firebase Firestore
```

---

## 🔐 Configuration Files

### Firebase Config (`src/config/firebase.js`)
```javascript
// Initializes Firebase with environment variables
// Exports: auth, db (for use in entire app)

// Used by: All services and components
```

### Authentication Hook (`src/hooks/useAuth.js`)
```javascript
// Provides: AuthContext, AuthProvider, useAuth hook
// Manages: User authentication state, admin status
// Features: Logout, auto-detection of admin role
```

---

## 📊 Database Collection Paths

### Firestore Collections
```
/faqs/{docId}
├─ question: string
├─ answer: string
├─ category: string
├─ keywords: array
├─ viewCount: number
├─ createdAt: timestamp
└─ updatedAt: timestamp

/admins/{uid}
├─ email: string
├─ role: "admin" string
└─ displayName: string

/queryLogs/{docId}
├─ question: string
├─ answer: string
├─ timestamp: timestamp
├─ wasHelpful: boolean/null
└─ userId: string

/analytics/{date}
├─ totalQueries: number
├─ totalFAQs: number
└─ helpfulResponses: number
```

---

## 🚀 Deployment File Paths

### Production Build Output
```
dist/
├─ index.html           - Main HTML file
├─ assets/
│   ├── index-*.js      - React & dependencies
│   └── index-*.css     - Compiled styles
└─ (Other assets)
```

### Firebase Deployment Files
```
firebase.json           - Deployment configuration
firestore.rules         - Database security rules
dist/                   - Build output (uploaded)
```

---

## 📝 Documentation File Guide

| File | Purpose | When to Read |
|------|---------|--------------|
| README.md | Overview & features | First |
| SETUP_GUIDE.md | Setup instructions | During setup |
| QUICK_REFERENCE.md | Quick commands | Daily use |
| DEPLOYMENT_CHECKLIST.md | Pre-deployment | Before deploy |
| ARCHITECTURE.md | System design | For understanding |
| FILE_INDEX.md | File reference | For navigation |
| PROJECT_COMPLETE.md | Completion summary | Project review |

---

## 🔄 Typical Development Workflow

```bash
# 1. Start development
npm run dev

# 2. Make changes to components in src/
# (Auto-reloads in browser)

# 3. Test functionality
# (Visit http://localhost:3000)

# 4. When ready to deploy:
npm run build

# 5. Preview production build
npm run preview

# 6. Deploy to Firebase
firebase deploy
```

---

## 🐛 Troubleshooting by File

### Can't connect to Firebase?
- Check: `src/config/firebase.js`
- Verify: `.env` file has correct credentials
- Run: `npm install`

### AI responses not working?
- Check: `src/services/aiService.js`
- Verify: `VITE_OPENROUTER_API_KEY` in `.env`
- Test: API key at openrouter.ai

### Admin dashboard not accessible?
- Check: `src/hooks/useAuth.js`
- Check: `src/components/admin/AdminLogin.jsx`
- Verify: Admin user in Firebase Authentication
- Verify: Admin document in Firestore `/admins/{uid}`

### FAQs not displaying?
- Check: `data/faqs.json` has data
- Run: `npm run import-faqs`
- Check: `firestore.rules` are deployed
- Verify: FAQs in Firestore `/faqs` collection

### Build errors?
- Check: `vite.config.js` settings
- Run: `npm install` to reinstall dependencies
- Clear: `node_modules` and `.next` directory

---

## 📦 Key Dependencies

```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-router-dom": "6.20.0",
  "firebase": "10.7.0",
  "vite": "5.0.8",
  "tailwindcss": "3.3.0"
}
```

---

## 🔗 Important URLs

### Development
- **App:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/dashboard
- **Login:** http://localhost:3000/admin/login

### Firebase Console
- **Authentication:** https://console.firebase.google.com/authentication
- **Firestore:** https://console.firebase.google.com/firestore
- **Hosting:** https://console.firebase.google.com/hosting

### External Services
- **OpenRouter:** https://openrouter.ai
- **Firebase Docs:** https://firebase.google.com/docs
- **React Docs:** https://react.dev

---

## 📋 File Checklist Before Deployment

```
Core Files:
□ src/App.jsx exists and has routing
□ src/main.jsx exists as entry point
□ src/index.css exists with Tailwind imports
□ src/config/firebase.js exports auth and db
□ src/hooks/useAuth.js provides context

Components:
□ All 9 component files exist
□ No commented-out code
□ No console.log statements
□ Proper imports in all files

Services:
□ aiService.js exports queryAI and extractKeywords
□ faqService.js has all required functions
□ No hardcoded API keys

Configuration:
□ .env file exists with all required vars
□ vite.config.js points to correct plugins
□ tailwind.config.js has proper content
□ firebase.json has correct project ID
□ firestore.rules are deployed in Firebase

Build:
□ npm install completes without errors
□ npm run build succeeds
□ npm run preview shows no errors
□ dist/ folder contains files

Firebase:
□ Authentication enabled
□ Firestore created
□ Rules deployed
□ Admin user created
□ Admin document in Firestore
□ FAQs imported
```

---

## 🎓 Quick Navigation

### To Find a Component
```bash
# User components
ls src/components/user/

# Admin components
ls src/components/admin/

# Services
ls src/services/

# Configuration
ls src/config/
```

### To Edit Configuration
```bash
# Environment variables
nano .env

# Firestore rules
nano firestore.rules

# Firebase settings
nano firebase.json

# Tailwind theme
nano tailwind.config.js
```

---

## 📞 File Modification Guide

### To Add New FAQ Category
1. Edit: `tailwind.config.js` (if adding colors)
2. Edit: `src/components/admin/FAQEditor.jsx` (add to categories array)
3. Add to: `firestore.rules` (if restricting access)

### To Change AI Behavior
1. Edit: `src/services/aiService.js` (modify system prompt)
2. Test locally: `npm run dev`
3. Deploy: `firebase deploy`

### To Customize Styling
1. Edit: `src/index.css` (global styles)
2. Edit: `tailwind.config.js` (theme colors)
3. Edit: Component files (Tailwind classes)

### To Add New Admin User
1. Firebase Console: Create user
2. Firestore: Add document to `/admins/{uid}`
3. Set: `role: "admin"`

---

**Last Updated:** November 2024
**Project Status:** ✅ Complete & Ready
**Total Files:** 40+

**Start with: `npm install` and `npm run dev`**
