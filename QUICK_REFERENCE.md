# CvSU FAQ System - Quick Reference Guide

## 🎯 30-Second Overview

The **CvSU Student Handbook Intelligent FAQ System** is a full-stack web app that:
- ✅ Answers student questions using DeepSeek R1 AI
- ✅ Stores FAQs in Firebase Firestore
- ✅ Has an admin dashboard for managing content
- ✅ Runs on React + Firebase + OpenRouter

---

## 📱 Two Main Interfaces

### 1. 🌟 Student Interface
**URL:** `/` (home page)

```
┌─────────────────────────────────────┐
│  CvSU Student Handbook FAQ          │
├─────────────────────────────────────┤
│  Chat History (scrollable)          │
│  ├─ User: "What is CvSU?"          │
│  └─ AI: "CvSU is..."               │
├─────────────────────────────────────┤
│  Related FAQs (expandable)          │
├─────────────────────────────────────┤
│  [Type question...] [Send]          │
└─────────────────────────────────────┘
```

**Features:**
- Ask questions about student handbook
- See AI responses instantly
- View related FAQs
- Chat history preserved

### 2. 🔐 Admin Interface
**URL:** `/admin/login`

```
┌─────────────────────────────────────┐
│  Admin Dashboard                    │
├─────────────────────────────────────┤
│  Stats:                             │
│  • Total FAQs: 10                  │
│  • Total Queries: 245              │
│  • Avg Views: 12.3                 │
├─────────────────────────────────────┤
│  FAQ Table:                         │
│  • Question | Category | Views     │
│  • [Edit] [Delete] buttons         │
├─────────────────────────────────────┤
│  [+ Add New FAQ] button             │
└─────────────────────────────────────┘
```

**Features:**
- View all FAQs
- Create new FAQ
- Edit existing FAQ
- Delete FAQ
- View analytics

---

## ⚙️ Setup Commands

```bash
# Step 1: Install dependencies
npm install

# Step 2: Create .env file (copy .env.example)
# Fill with Firebase and OpenRouter keys

# Step 3: Import sample FAQs
npm run import-faqs

# Step 4: Start development
npm run dev

# Step 5: Build for production
npm run build

# Step 6: Deploy to Firebase
firebase deploy
```

---

## 🔑 Environment Variables

Create `.env` file with:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=cvsu-faq.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cvsu-faq
VITE_FIREBASE_STORAGE_BUCKET=cvsu-faq.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc...
VITE_OPENROUTER_API_KEY=sk-or-v1-...
```

Get from:
- Firebase: [Firebase Console](https://console.firebase.google.com)
- OpenRouter: [OpenRouter Dashboard](https://openrouter.ai)

---

## 👤 Demo Credentials

**User Type:** Admin
- **Email:** `demo@cvsu.edu.ph`
- **Password:** `demo123456`

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app routing |
| `src/components/user/HomePage.jsx` | Chat interface |
| `src/components/admin/AdminDashboard.jsx` | Admin panel |
| `src/services/aiService.js` | AI integration |
| `src/services/faqService.js` | Database functions |
| `src/config/firebase.js` | Firebase setup |
| `firebase.json` | Firebase config |
| `firestore.rules` | Database security |

---

## 🗄️ Database Structure

**Collections:**
```
faqs/              ← FAQ documents
├─ id: "auto"
├─ question: "..."
├─ answer: "..."
└─ category: "..."

admins/            ← Admin users
├─ uid: "user-id"
├─ role: "admin"
└─ email: "..."

queryLogs/         ← User questions
├─ question: "..."
├─ timestamp: "..."
└─ wasHelpful: true/false

analytics/         ← Statistics
└─ totalQueries: 123
```

---

## 🔄 Common Tasks

### Add a New FAQ (via Admin)
1. Go to `/admin/dashboard`
2. Click "Add New FAQ"
3. Fill in:
   - Question
   - Answer
   - Category
4. Click "Create FAQ"

### Add Multiple FAQs (bulk)
1. Edit `data/faqs.json`
2. Add FAQ objects
3. Run `npm run import-faqs`

### Create New Admin User
1. Firebase Console → Authentication → Add User
2. Firebase Console → Firestore → admins collection
3. Create doc with user UID
4. Set `role: "admin"`

### Update Firestore Rules
1. Edit `firestore.rules`
2. Go to Firebase Console → Firestore → Rules
3. Paste new rules
4. Publish

### Deploy Changes
```bash
npm run build
firebase deploy
```

---

## 🎨 Customize Branding

### Colors
- Edit `tailwind.config.js`
- Change `cvsu` color theme

### Text
- Edit component files
- Search for hardcoded strings
- Replace with your text

### Logo
- Replace with your logo file
- Update `src/components/user/HomePage.jsx`

---

## 🐛 Troubleshooting

### Problem: "Firebase API key not found"
**Solution:**
- Verify `.env` file exists
- Check `.env` not in `.gitignore`
- Restart dev server: `npm run dev`

### Problem: "No FAQs showing"
**Solution:**
- Run `npm run import-faqs`
- Check Firestore has `faqs` collection
- Verify Firestore rules are published

### Problem: "Admin login not working"
**Solution:**
- Check admin user in Firebase Authentication
- Verify admin document in Firestore
- Check UID matches between Auth and Firestore

### Problem: "AI responses not working"
**Solution:**
- Verify OpenRouter API key in `.env`
- Check API key at [OpenRouter](https://openrouter.ai)
- Test API manually with curl

---

## 📊 Monitor Your System

### Check FAQs
```
Firebase Console
→ Firestore Database
→ faqs collection
```

### Check Queries Logged
```
Firebase Console
→ Firestore Database
→ queryLogs collection
```

### Check Admin Users
```
Firebase Console
→ Authentication (Users tab)
→ admins collection
```

---

## 🚀 Deployment Checklist

```bash
# 1. Test locally
npm run dev
# Test user interface
# Test admin dashboard

# 2. Build
npm run build
# Check for errors

# 3. Preview
npm run preview
# Test production build

# 4. Deploy
firebase deploy
# Check live URL
```

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| Firebase Console | https://console.firebase.google.com |
| OpenRouter | https://openrouter.ai |
| React Docs | https://react.dev |
| Tailwind CSS | https://tailwindcss.com |
| Firebase Docs | https://firebase.google.com/docs |

---

## 📞 Need Help?

1. **Setup Issues** → Read `SETUP_GUIDE.md`
2. **Project Structure** → Read `README.md`
3. **Deployment** → Read `DEPLOYMENT_CHECKLIST.md`
4. **Code Questions** → Check component comments
5. **Firebase Issues** → Check `firestore.rules`

---

## 🎯 Success Indicators

✅ Can see chat interface on `/`
✅ Can ask questions and get AI responses
✅ Can access admin at `/admin/login`
✅ Can create/edit/delete FAQs
✅ Can view analytics
✅ All deployed to live URL

---

## 🎓 Learning Points

This project demonstrates:
- React component architecture
- Firebase integration
- REST API consumption
- Authentication & authorization
- Firestore database design
- Tailwind CSS styling
- Environment configuration
- Build and deployment

Perfect for learning full-stack React!

---

## 📈 Usage Statistics

To view usage data:

```javascript
// In browser console on admin dashboard
db.collection('queryLogs').get().then(snap => {
  console.log('Total queries:', snap.size);
  snap.docs.forEach(doc => console.log(doc.data()));
});
```

---

## 🔐 Security Reminders

✅ Never commit `.env` file
✅ Never hardcode API keys
✅ Always use environment variables
✅ Keep Firestore rules updated
✅ Regularly audit admin users
✅ Monitor API usage

---

## 🎉 You're All Set!

The system is ready to use. Start with:

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000`

**Happy FAQ-ing! 🚀**

---

**Last Updated:** November 2024
**Version:** 1.0.0
**Status:** ✅ Production Ready
