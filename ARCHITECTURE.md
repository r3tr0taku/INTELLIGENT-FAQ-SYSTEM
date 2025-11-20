# 🏗️ CvSU FAQ System - Architecture & Design

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (React)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              User Interface                          │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                      │  │
│  │  ┌──────────────────┐  ┌──────────────────┐         │  │
│  │  │  Public Pages    │  │  Admin Pages      │         │  │
│  │  ├──────────────────┤  ├──────────────────┤         │  │
│  │  │ • HomePage       │  │ • AdminLogin     │         │  │
│  │  │ • ChatDisplay    │  │ • AdminDashboard │         │  │
│  │  │ • FAQCard        │  │ • FAQEditor      │         │  │
│  │  │ • InputForm      │  │ • FAQTable       │         │  │
│  │  │                  │  │ • Analytics      │         │  │
│  │  └──────────────────┘  └──────────────────┘         │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Service Layer (Business Logic)            │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                      │  │
│  │  ┌────────────────────┐  ┌─────────────────────┐   │  │
│  │  │  AI Service        │  │  FAQ Service        │   │  │
│  │  ├────────────────────┤  ├─────────────────────┤   │  │
│  │  │ • queryAI()        │  │ • searchFAQs()      │   │  │
│  │  │ • extractKeywords()│  │ • getAllFAQs()      │   │  │
│  │  │                    │  │ • createFAQ()       │   │  │
│  │  │                    │  │ • updateFAQ()       │   │  │
│  │  │                    │  │ • deleteFAQ()       │   │  │
│  │  │                    │  │ • logQuery()        │   │  │
│  │  │                    │  │ • incrementViews()  │   │  │
│  │  │                    │  │ • markFeedback()    │   │  │
│  │  └────────────────────┘  └─────────────────────┘   │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│         ↓                              ↓                    │
└─────────────────────────────────────────────────────────────┘
│         ↓                              ↓                    │
├─────────────────────────────────────────────────────────────┤
│                   BACKEND LAYER (Firebase)                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        Firebase Services                            │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                      │  │
│  │  ┌─────────────────────┐  ┌─────────────────────┐  │  │
│  │  │ Authentication      │  │ Firestore Database  │  │  │
│  │  ├─────────────────────┤  ├─────────────────────┤  │  │
│  │  │ • Email/Password    │  │ • Collections       │  │  │
│  │  │ • User Management   │  │ • Documents         │  │  │
│  │  │ • Auth State        │  │ • Queries           │  │  │
│  │  │ • Session Mgmt      │  │ • Transactions      │  │  │
│  │  │                     │  │ • Indexes           │  │  │
│  │  └─────────────────────┘  └─────────────────────┘  │  │
│  │          ↓                            ↓             │  │
│  │  ┌─────────────────────────────────────────────┐   │  │
│  │  │       Firestore Collections                │   │  │
│  │  ├─────────────────────────────────────────────┤   │  │
│  │  │                                             │   │  │
│  │  │  📚 faqs/          - FAQ Documents          │   │  │
│  │  │     • question      - User questions        │   │  │
│  │  │     • answer        - Answers               │   │  │
│  │  │     • category      - FAQ category          │   │  │
│  │  │     • keywords      - Search keywords       │   │  │
│  │  │     • viewCount     - View statistics       │   │  │
│  │  │     • timestamps    - Created/Updated       │   │  │
│  │  │                                             │   │  │
│  │  │  👤 admins/        - Admin Users            │   │  │
│  │  │     • role          - Admin role            │   │  │
│  │  │     • email         - Admin email           │   │  │
│  │  │     • displayName   - Display name          │   │  │
│  │  │                                             │   │  │
│  │  │  📝 queryLogs/     - Query History          │   │  │
│  │  │     • question      - Asked question        │   │  │
│  │  │     • answer        - AI response           │   │  │
│  │  │     • timestamp     - Query time            │   │  │
│  │  │     • wasHelpful    - Feedback              │   │  │
│  │  │                                             │   │  │
│  │  │  📊 analytics/     - Analytics Data         │   │  │
│  │  │     • totalQueries  - Query count           │   │  │
│  │  │     • helpfulCount  - Helpful responses     │   │  │
│  │  │                                             │   │  │
│  │  └─────────────────────────────────────────────┘   │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   Firestore Security Rules                          │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  • FAQs: Public read, Admin write                   │  │
│  │  • Admins: Admin only access                        │  │
│  │  • QueryLogs: Public create, Admin read             │  │
│  │  • Analytics: Admin only                            │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
        ↓
├─────────────────────────────────────────────────────────────┤
│              EXTERNAL SERVICES LAYER                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  OpenRouter API Gateway                             │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                    ↓                                │  │
│  │  ┌──────────────────────────────────────────────┐  │  │
│  │  │  DeepSeek R1 Model                           │  │  │
│  │  │  • Question Processing                        │  │  │
│  │  │  • Context Analysis                           │  │  │
│  │  │  • Answer Generation                          │  │  │
│  │  │  • Real-time Responses                        │  │  │
│  │  └──────────────────────────────────────────────┘  │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### User Asking a Question

```
User Types Question
       ↓
  HomePage.jsx
       ↓
  ┌─────────────────────────────────┐
  │ Parallel Operations             │
  ├─────────────────────────────────┤
  │                                 │
  │  Path 1: Search FAQs            │
  │  ├─ extractKeywords()           │
  │  ├─ searchFAQs(keywords)        │
  │  └─ Query Firestore faqs/       │
  │      Returns: [relatedFAQs]     │
  │                                 │
  │  Path 2: Get AI Response        │
  │  ├─ queryAI(question, faqs)     │
  │  ├─ Build system prompt         │
  │  ├─ Call OpenRouter API         │
  │  ├─ DeepSeek R1 processes       │
  │  └─ Returns: aiResponse         │
  │                                 │
  │  Path 3: Log Query              │
  │  ├─ logQuery()                  │
  │  └─ Save to queryLogs/          │
  │                                 │
  └─────────────────────────────────┘
       ↓ (All paths complete)
Display Results
├─ ChatDisplay: AI response
├─ FAQCard: Related FAQs
└─ Chat history updated
```

### Admin Creating FAQ

```
Admin Clicks "Add New FAQ"
       ↓
  FAQEditor.jsx (modal)
       ↓
Admin Fills:
├─ Question
├─ Answer
└─ Category
       ↓
Click "Create FAQ"
       ↓
createFAQ() Service
├─ Extract keywords
├─ Add timestamps
└─ Add viewCount: 0
       ↓
Save to Firestore
faqs/ collection
       ↓
Firestore Rules
Check:
├─ User authenticated?
├─ User has admin role?
└─ Valid data?
       ↓
✓ Document created
       ↓
Update FAQTable display
Refresh dashboard
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────┐
│           Authentication Flow                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Step 1: User enters credentials               │
│  ├─ Email: demo@cvsu.edu.ph                    │
│  └─ Password: ****                             │
│           ↓                                    │
│  Step 2: Firebase Auth validates               │
│  ├─ Checks against Authentication DB           │
│  ├─ Validates email/password                   │
│  └─ Returns: Firebase user object              │
│           ↓                                    │
│  Step 3: Check admin status                    │
│  ├─ Query Firestore admins/ collection         │
│  ├─ Find document with UID                     │
│  ├─ Check role = "admin"                       │
│  └─ Returns: admin object                      │
│           ↓                                    │
│  Step 4: Set auth context                      │
│  ├─ Store user in state                        │
│  ├─ Store admin in state                       │
│  └─ Set isAdmin flag                           │
│           ↓                                    │
│  Step 5: Allow access                          │
│  ├─ Redirect to /admin/dashboard               │
│  └─ Render protected components                │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
App.jsx (Main Router)
│
├─ / (public route)
│  └─ HomePage.jsx
│     ├─ ChatDisplay.jsx
│     ├─ FAQCard.jsx
│     └─ QuestionInput.jsx
│
├─ /admin/login (public route)
│  └─ AdminLogin.jsx
│
└─ /admin/dashboard (protected route)
   └─ ProtectedRoute
      └─ AdminDashboard.jsx
         ├─ FAQTable.jsx
         │  └─ [Each FAQ row with Edit/Delete]
         ├─ FAQEditor.jsx (modal)
         └─ [Stats cards]
```

---

## State Management

### Global State (Context)

```
AuthContext
├─ user: Firebase user object
├─ admin: Admin document data
├─ loading: Loading state
├─ isAdmin: Boolean flag
└─ logout(): Function
```

### Component Local State

```
HomePage.jsx
├─ question: string (input)
├─ chatHistory: array
├─ suggestedFAQs: array
├─ loading: boolean
└─ error: string

AdminDashboard.jsx
├─ faqs: array
├─ showEditor: boolean
├─ currentFAQ: object
├─ loading: boolean
└─ stats: object

FAQEditor.jsx
├─ question: string
├─ answer: string
├─ category: string
├─ loading: boolean
└─ error: string
```

---

## API Integration Flow

### OpenRouter AI API

```
Request Structure:
─────────────────
POST https://openrouter.ai/api/v1/chat/completions

Headers:
├─ Authorization: Bearer {API_KEY}
├─ HTTP-Referer: https://cvsu-faq.web.app
├─ X-Title: CvSU FAQ System
└─ Content-Type: application/json

Body:
├─ model: "deepseek/deepseek-r1:free"
├─ messages: [
│  ├─ role: "system"
│  │  └─ content: (system prompt with FAQ context)
│  └─ role: "user"
│     └─ content: (user question)
│  ]
└─ temperature: (default)

Response:
────────
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Answer text..."
      }
    }
  ]
}

Flow:
────
User Question
    ↓
Extract Keywords
    ↓
Search Related FAQs
    ↓
Build System Prompt
├─ Context: Related FAQ knowledge
├─ Instructions: Be helpful, accurate
└─ Constraints: CvSU handbook only
    ↓
Send to OpenRouter
    ↓
DeepSeek R1 Processing
    ↓
Return Response
    ↓
Display to User
    ↓
Log to Firestore
```

---

## Firestore Query Patterns

### FAQ Search

```javascript
// Search FAQs by keywords
1. Extract keywords from question
   "What is grading?" → ["grading", "what"]

2. Get all FAQs (client-side filtering)
   const faqs = await getDocs(collection(db, 'faqs'))

3. Filter by keywords
   faqs.filter(faq =>
     keywords.some(kw =>
       faq.question.includes(kw) ||
       faq.keywords.includes(kw)
     )
   )

4. Sort by viewCount
5. Limit to top 5 results
```

### Query Logging

```javascript
// Log user query
addDoc(collection(db, 'queryLogs'), {
  question: "User's question",
  answer: "AI response",
  relatedFAQCount: 3,
  timestamp: serverTimestamp(),
  wasHelpful: null,  // Updated later with feedback
  userId: "anonymous"
})
```

---

## Security Model

### Firestore Rules Structure

```
┌─ Public (Anyone)
│  └─ Can READ FAQs
│     └─ Can CREATE queryLogs
│
├─ Authenticated Users
│  └─ Must be logged in
│
└─ Admins
   ├─ Can READ/WRITE/DELETE FAQs
   ├─ Can READ queryLogs
   ├─ Can READ analytics
   └─ Must have role: "admin" in admins/
```

### Rule Verification

```
For each request:
1. Check authentication status
   if !auth → Check if public action (READ faqs, CREATE queryLogs)
   
2. Check admin status
   if admin action → Query Firestore
   get /admins/{uid}
   if role == "admin" → ALLOW
   else → DENY

3. Verify document structure
   Required fields present?
   Data types correct?
```

---

## Error Handling Strategy

```
User Action
    ↓
Try-Catch Block
    ├─ Success Path
    │  └─ Update UI
    │
    └─ Error Path
       ├─ Log error
       ├─ Display user-friendly message
       └─ Suggest next steps
           ├─ Check connection
           ├─ Retry action
           └─ Contact support
```

---

## Performance Considerations

```
Frontend Optimization:
├─ Lazy load components (React.lazy)
├─ Memo components (React.memo)
├─ Memoize callbacks (useCallback)
└─ Optimize re-renders

Database Optimization:
├─ Index frequently searched fields
├─ Batch operations when possible
├─ Archive old queryLogs
└─ Limit query results (top 5 FAQs)

API Optimization:
├─ Cache FAQ results
├─ Debounce search inputs
├─ Limit API calls
└─ Monitor usage

Build Optimization:
├─ Minify code
├─ Tree-shake unused imports
├─ Compress assets
└─ Use CDN for static files
```

---

## Deployment Architecture

```
┌─ Development
│  ├─ Local machine
│  ├─ npm run dev
│  ├─ Firebase emulator (optional)
│  └─ Hot reload enabled
│
├─ Testing
│  ├─ npm run build
│  ├─ npm run preview
│  └─ Verify build output
│
└─ Production
   ├─ Firebase Hosting
   ├─ Auto HTTPS
   ├─ Global CDN
   ├─ Custom domain (optional)
   └─ Auto scaling
```

---

## Scaling Considerations

```
Current Setup (Works for ~1000 concurrent users):
├─ Single Firestore database
├─ Single region (Southeast Asia)
├─ Firebase Hosting (auto-scaling)
└─ OpenRouter free tier

To Scale Up:
├─ Add read replicas
├─ Implement caching layer (Redis)
├─ Optimize database queries
├─ Consider Firestore sharding
└─ Upgrade to OpenRouter paid tier
```

---

**Architecture Document**
**Last Updated:** November 2024
**Status:** ✅ Complete
