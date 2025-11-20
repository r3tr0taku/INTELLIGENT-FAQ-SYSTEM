# 📚 CvSU FAQ System - Complete File Index

## Project Overview
Full-stack intelligent FAQ system for Cavite State University using React, Firebase, and DeepSeek R1 AI.

---

## 📦 Complete File Structure

### Root Level Files
```
cvsu-faq-system/
├── 📄 package.json                 # Dependencies and scripts
├── 📄 .env.example                 # Environment template (rename to .env)
├── 📄 .env.template                # Detailed env configuration guide
├── 📄 .gitignore                   # Git ignore rules
├── 📄 index.html                   # Main HTML file
├── 📄 vite.config.js               # Vite build configuration
├── 📄 tailwind.config.js           # Tailwind CSS configuration
├── 📄 postcss.config.js            # PostCSS configuration
├── 📄 firebase.json                # Firebase hosting config
├── 📄 firestore.rules              # Firestore security rules
└── 📄 .git/                        # Git repository
```

### Documentation Files
```
├── 📖 README.md                    # Main project documentation
├── 📖 SETUP_GUIDE.md               # Step-by-step setup instructions
├── 📖 DEPLOYMENT_CHECKLIST.md      # Pre/post deployment checklist
├── 📖 PROJECT_COMPLETE.md          # Project completion summary
├── 📖 QUICK_REFERENCE.md           # Quick reference guide
└── 🎯 This file (FILE_INDEX.md)
```

### Source Code Files

#### Frontend Components

**User Interface Components** (`src/components/user/`)
```
├── 📦 HomePage.jsx                 # Main chat interface
│   ├─ Chat display with history
│   ├─ Related FAQs section
│   ├─ Question input form
│   └─ AI response handling
│
├── 📦 ChatDisplay.jsx              # Chat message component
│   ├─ User message display
│   ├─ AI response display
│   ├─ Error message display
│   └─ Related FAQ references
│
├── 📦 FAQCard.jsx                  # FAQ card component
│   ├─ Question preview
│   ├─ Category label
│   └─ View count display
│
└── 📦 QuestionInput.jsx            # Question input form
    ├─ Text input field
    ├─ Send button
    └─ Loading state
```

**Admin Dashboard Components** (`src/components/admin/`)
```
├── 📦 AdminLogin.jsx               # Admin login page
│   ├─ Email input
│   ├─ Password input
│   ├─ Error handling
│   └─ Demo credentials display
│
├── 📦 AdminDashboard.jsx           # Main admin interface
│   ├─ Statistics display
│   ├─ FAQ management
│   ├─ Analytics section
│   └─ Logout button
│
├── 📦 FAQEditor.jsx                # FAQ creation/edit modal
│   ├─ Question field
│   ├─ Answer field
│   ├─ Category selector
│   └─ Save/Cancel buttons
│
├── 📦 FAQTable.jsx                 # FAQ list table
│   ├─ Question display
│   ├─ Category column
│   ├─ Views column
│   ├─ Created date column
│   └─ Edit/Delete buttons
│
└── 📦 Analytics.jsx                # Analytics dashboard
    ├─ Key metrics display
    ├─ Helpful rate calculation
    ├─ Most viewed FAQs
    └─ Refresh button
```

#### Services

**Service Layer** (`src/services/`)
```
├── 📦 aiService.js                 # OpenRouter AI Integration
│   ├─ queryAI(question, faqs)      # Main AI query function
│   │  ├─ System prompt generation
│   │  ├─ API request handling
│   │  ├─ Error handling
│   │  └─ Response parsing
│   │
│   └─ extractKeywords(text)        # Keyword extraction
│      ├─ Stop word filtering
│      ├─ Word length filtering
│      └─ Top 5 keywords selection
│
└── 📦 faqService.js                # Firestore Database Operations
    ├─ searchFAQs(text)             # Search FAQs by keywords
    ├─ getAllFAQs()                 # Fetch all FAQs
    ├─ createFAQ(data)              # Create new FAQ
    ├─ updateFAQ(id, data)          # Update existing FAQ
    ├─ deleteFAQ(id)                # Delete FAQ
    ├─ logQuery(q, a, faqs)         # Log user query
    ├─ incrementViewCount(id)       # Track FAQ views
    ├─ markFeedback(id, helpful)    # Record feedback
    └─ getFAQsByCategory(cat)       # Get FAQs by category
```

#### Configuration

**Config Files** (`src/config/`)
```
└── 📦 firebase.js                  # Firebase Initialization
    ├─ initializeApp()
    ├─ getAuth()
    ├─ getFirestore()
    └─ Export auth, db instances
```

#### Hooks

**Custom Hooks** (`src/hooks/`)
```
└── 📦 useAuth.js                   # Authentication Context
    ├─ AuthProvider component
    │  ├─ onAuthStateChanged listener
    │  ├─ Admin status checking
    │  └─ Auth context provision
    │
    └─ useAuth() hook
       ├─ user object
       ├─ admin object
       ├─ loading state
       ├─ logout function
       └─ isAdmin flag
```

#### Main Application Files

**Core App Files** (`src/`)
```
├── 📦 App.jsx                      # Main App Component
│   ├─ Router setup
│   ├─ Route definitions
│   ├─ AuthProvider wrapper
│   ├─ ProtectedRoute component
│   └─ Route guard logic
│
├── 📦 main.jsx                     # Application Entry Point
│   ├─ React.createRoot()
│   ├─ App component rendering
│   └─ DOM mounting
│
└── 📄 index.css                    # Global Styles
    ├─ Tailwind imports
    ├─ Custom animations
    ├─ Scrollbar styling
    ├─ Line clamp utilities
    └─ Global typography
```

### Data & Scripts

**Data Files** (`data/`)
```
└── 📦 faqs.json                    # Sample FAQ Data
    ├─ 10 sample FAQs
    ├─ Question and answers
    ├─ Categories
    └─ Ready for import
```

**Scripts** (`scripts/`)
```
└── 📦 importFAQs.js                # FAQ Import Script
    ├─ Firebase initialization
    ├─ FAQ file reading
    ├─ Batch import process
    ├─ Progress logging
    ├─ Error handling
    └─ Completion summary
```

---

## 🗂️ Complete Directory Tree

```
cvsu-faq-system/
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 user/
│   │   │   ├── ChatDisplay.jsx
│   │   │   ├── FAQCard.jsx
│   │   │   ├── HomePage.jsx
│   │   │   └── QuestionInput.jsx
│   │   │
│   │   └── 📁 admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminLogin.jsx
│   │       ├── Analytics.jsx
│   │       ├── FAQEditor.jsx
│   │       └── FAQTable.jsx
│   │
│   ├── 📁 config/
│   │   └── firebase.js
│   │
│   ├── 📁 hooks/
│   │   └── useAuth.js
│   │
│   ├── 📁 services/
│   │   ├── aiService.js
│   │   └── faqService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── 📁 public/
│   └── index.html
│
├── 📁 data/
│   └── faqs.json
│
├── 📁 scripts/
│   └── importFAQs.js
│
├── 📁 .git/
│   └── (Git repository)
│
├── Configuration Files
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── firebase.json
│   └── firestore.rules
│
├── Environment Files
│   ├── .env.example
│   ├── .env.template
│   └── .gitignore
│
├── Documentation
│   ├── README.md
│   ├── SETUP_GUIDE.md
│   ├── DEPLOYMENT_CHECKLIST.md
│   ├── PROJECT_COMPLETE.md
│   ├── QUICK_REFERENCE.md
│   └── FILE_INDEX.md (this file)
│
└── Build Output (created on build)
    └── 📁 dist/
        ├── index.html
        ├── assets/
        └── (compiled files)
```

---

## 📊 File Statistics

| Category | Count | Files |
|----------|-------|-------|
| React Components | 9 | .jsx files |
| Services | 2 | .js files |
| Configuration | 1 | .js files |
| Hooks | 1 | .js files |
| Entry Points | 2 | .jsx/.js files |
| Styling | 1 | .css file |
| Config Files | 4 | .json/.js files |
| Documentation | 6 | .md files |
| Scripts | 1 | .js file |
| Data | 1 | .json file |
| **Total** | **~28** | **Production Ready** |

---

## 🚀 Quick File Navigation

### To Create a New FAQ Page
1. Edit `src/components/user/HomePage.jsx`
2. Modify FAQ display sections
3. Update `src/services/faqService.js` if needed

### To Customize Admin Dashboard
1. Edit `src/components/admin/AdminDashboard.jsx`
2. Modify components layout
3. Update analytics in `src/components/admin/Analytics.jsx`

### To Change AI Behavior
1. Edit `src/services/aiService.js`
2. Modify system prompt
3. Adjust extraction keywords

### To Add New Collections
1. Update `firestore.rules`
2. Create service functions in `src/services/faqService.js`
3. Update security rules in Firebase Console

### To Customize Styling
1. Edit `tailwind.config.js` for themes
2. Edit `src/index.css` for global styles
3. Inline Tailwind classes in JSX files

---

## 📝 File Dependencies

```
App.jsx
├─ react-router-dom
├─ HomePage component
├─ AdminLogin component
├─ AdminDashboard component
└─ useAuth hook

HomePage.jsx
├─ aiService (queryAI, extractKeywords)
├─ faqService (searchFAQs, logQuery)
├─ ChatDisplay component
├─ QuestionInput component
└─ FAQCard component

AdminDashboard.jsx
├─ faqService (getAllFAQs)
├─ firebase (Firestore)
├─ useAuth hook
├─ react-router (useNavigate)
├─ FAQEditor component
└─ FAQTable component

FAQEditor.jsx
├─ faqService (createFAQ, updateFAQ)
└─ Styling via Tailwind

FAQTable.jsx
├─ faqService (deleteFAQ)
└─ useState for delete state

Analytics.jsx
├─ firebase (Firestore queries)
└─ useState for data storage

useAuth.js
├─ firebase (auth, Firestore)
├─ react (useEffect, useState, Context)
└─ Provides auth state globally

aiService.js
├─ Fetch API
└─ OpenRouter REST endpoints

faqService.js
├─ firebase (Firestore operations)
├─ aiService (extractKeywords)
└─ serverTimestamp from firebase

firebase.js
├─ firebase/app
├─ firebase/auth
└─ firebase/firestore
```

---

## 🔄 Data Flow Diagram

```
User Input (Question)
    ↓
HomePage.jsx
    ↓
    ├─→ faqService.searchFAQs() → Query Firestore
    │   └─→ Match keywords
    │
    ├─→ aiService.queryAI()
    │   ├─→ OpenRouter API
    │   └─→ DeepSeek R1 Response
    │
    └─→ faqService.logQuery() → Store in queryLogs collection
        └─→ Firebase Firestore
    ↓
Display Response
    ├─→ ChatDisplay.jsx
    └─→ FAQCard.jsx
```

---

## 🔐 Security Files

```
Security Implementation:
├─ firestore.rules          # Database access control
├─ .env (keep secret)       # API keys storage
├─ .gitignore               # Prevent git commits
├─ src/hooks/useAuth.js     # Authentication logic
└─ Protected routes in App.jsx
```

---

## 📚 Documentation Files Map

| Document | Purpose | When to Read |
|----------|---------|--------------|
| README.md | Project overview | First time |
| SETUP_GUIDE.md | Detailed setup | During installation |
| QUICK_REFERENCE.md | Quick commands | Day-to-day use |
| DEPLOYMENT_CHECKLIST.md | Before deploying | Before production |
| PROJECT_COMPLETE.md | What was created | Project overview |
| FILE_INDEX.md | This file | Understanding structure |

---

## 🛠️ Build & Deploy Files

```
vite.config.js          # Dev server and build config
tailwind.config.js      # Tailwind CSS customization
postcss.config.js       # CSS processing
firebase.json           # Firebase hosting rules
firestore.rules         # Firestore security
package.json            # Dependencies and scripts
```

---

## 📦 How to Use Each File

### To Start Development
```bash
npm install              # Install dependencies from package.json
npm run dev              # Start dev server (Vite)
```

### To Build for Production
```bash
npm run build            # Build using vite.config.js
npm run preview          # Preview build locally
```

### To Deploy
```bash
firebase deploy          # Uses firebase.json + firestore.rules
```

### To Import Data
```bash
npm run import-faqs      # Runs scripts/importFAQs.js with data/faqs.json
```

---

## 🎓 Learning Resources from Files

1. **React Patterns** → `src/components/` (component composition)
2. **Firebase Integration** → `src/config/firebase.js` + `src/services/faqService.js`
3. **Context API** → `src/hooks/useAuth.js`
4. **Routing** → `src/App.jsx`
5. **API Integration** → `src/services/aiService.js`
6. **Tailwind CSS** → `src/index.css` + `tailwind.config.js`
7. **Configuration** → `vite.config.js`, `.env` management

---

## ✅ File Verification Checklist

- [ ] All `.jsx` files have proper imports
- [ ] All services properly export functions
- [ ] All components use proper prop validation
- [ ] `.env` file is in `.gitignore`
- [ ] `firestore.rules` are deployed
- [ ] `firebase.json` points to correct project
- [ ] `package.json` has all dependencies
- [ ] `vite.config.js` has correct build settings

---

## 📞 File Support

| Issue | Check File | Solution |
|-------|-----------|----------|
| Build error | `vite.config.js`, `package.json` | Check configs |
| AI not working | `src/services/aiService.js` | Verify API key |
| Database error | `src/services/faqService.js`, `firestore.rules` | Check rules |
| Auth issues | `src/hooks/useAuth.js` | Verify Firebase config |
| Styling issues | `src/index.css`, `tailwind.config.js` | Check CSS |
| Routing issues | `src/App.jsx` | Check routes |

---

## 🎯 Next Steps

1. Read `SETUP_GUIDE.md` for installation
2. Configure `.env` file
3. Run `npm install`
4. Start with `npm run dev`
5. Test both interfaces
6. Deploy using `firebase deploy`

---

**File Index Created:** November 2024
**Total Files:** 28+ (+ git history)
**Project Status:** ✅ Complete & Ready
