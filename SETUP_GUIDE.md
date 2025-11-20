# CvSU FAQ System - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Firebase Setup](#firebase-setup)
3. [OpenRouter API Setup](#openrouter-api-setup)
4. [Local Development](#local-development)
5. [Deployment](#deployment)
6. [Admin User Management](#admin-user-management)

---

## Prerequisites

Before starting, ensure you have:
- **Node.js** 16.0 or higher
- **npm** 7.0 or higher (comes with Node.js)
- **Git** (optional but recommended)
- A **Google Account** (for Firebase)
- **Internet connection**

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

---

## Firebase Setup

### Step 1: Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name: `cvsu-faq`
4. Disable "Enable Google Analytics" (optional)
5. Click "Create project"
6. Wait for project creation to complete

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Under "Sign-in method", click "Email/Password"
4. Toggle "Enable"
5. Click "Save"

### Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose region: **Asia-southeast1 (Singapore)**
4. Start in **Test mode** (for development)
5. Click "Create"

### Step 4: Get Firebase Credentials

1. Go to **Project settings** (gear icon)
2. Under "Your apps", click the web icon `</>`
3. Register app name: `cvsu-faq-web`
4. Copy the Firebase config object

Save this configuration - you'll need it for `.env` file.

### Step 5: Deploy Firestore Rules

1. Go to **Firestore Database > Rules**
2. Copy content from `firestore.rules` file in the project
3. Paste into the Rules editor
4. Click "Publish"

**Example Rules Content:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // FAQs - Public read, Admin write
    match /faqs/{faqId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && 
                     get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == "admin";
    }
    
    // Admins - Admin only
    match /admins/{adminId} {
      allow read: if request.auth != null && 
                    request.auth.uid == adminId;
      allow write: if request.auth != null && 
                     request.auth.uid == adminId;
    }
    
    // Query Logs - Anyone can create, Admin can read
    match /queryLogs/{logId} {
      allow create: if true;
      allow read, update: if request.auth != null && 
                    get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == "admin";
    }
    
    // Analytics - Admin only
    match /analytics/{document=**} {
      allow read, write: if request.auth != null && 
                           get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == "admin";
    }
  }
}
```

---

## OpenRouter API Setup

### Step 1: Create Account

1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Click "Sign up"
3. Create account (Google, GitHub, or email)
4. Verify email if using email signup

### Step 2: Get API Key

1. Once logged in, go to **Keys** section
2. Click "Create new key"
3. Name it: `cvsu-faq-app`
4. Copy the API key (format: `sk-or-v1-...`)

### Step 3: Test API Key

Optional but recommended to verify it works:

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "HTTP-Referer: https://yoursite.com" \
  -H "X-Title: Your App Title" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek/deepseek-r1:free",
    "messages": [
      {"role": "user", "content": "Say hello"}
    ]
  }'
```

---

## Local Development

### Step 1: Clone Project

```bash
# If using Git
git clone <repository-url>
cd cvsu-faq-system

# Or download and extract ZIP file
cd cvsu-faq-system
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- React 18
- Vite
- Firebase
- React Router
- Tailwind CSS
- All other dependencies

Installation may take 2-5 minutes.

### Step 3: Create Environment File

1. In project root, copy `.env.example` to `.env`
2. Open `.env` file
3. Fill in your Firebase credentials:

```env
# From Firebase Console > Project Settings
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=cvsu-faq.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cvsu-faq
VITE_FIREBASE_STORAGE_BUCKET=cvsu-faq.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...

# From OpenRouter
VITE_OPENROUTER_API_KEY=sk-or-v1-...
```

### Step 4: Setup Firestore Collections

1. Open Firebase Console > Firestore
2. Create these collections:
   - `faqs` (will be populated later)
   - `admins` (create first admin)
   - `queryLogs` (auto-created on first query)
   - `analytics` (auto-created on first data)

### Step 5: Create Admin User

**In Firebase Console - Authentication:**
1. Go to "Users" tab
2. Click "Add user"
3. Email: `demo@cvsu.edu.ph`
4. Password: `demo123456`
5. Click "Add user"
6. Copy the UID (long string)

**In Firebase Console - Firestore:**
1. Go to `admins` collection
2. Click "Add document"
3. Document ID: (paste the UID from previous step)
4. Add fields:
   ```
   role: "admin" (string)
   email: "demo@cvsu.edu.ph" (string)
   displayName: "Demo Admin" (string)
   ```
5. Click "Save"

### Step 6: Import Initial FAQs

```bash
npm run import-faqs
```

This imports 10 sample FAQs from `data/faqs.json` into Firestore.

**Expected output:**
```
Starting FAQ import...
✓ Imported: "What is the full name of the university?..."
✓ Imported: "What are the admission requirements..."
...
✓ Import complete!
  Total imported: 10
  Skipped: 0
```

### Step 7: Start Development Server

```bash
npm run dev
```

The app will:
- Start on `http://localhost:3000`
- Open in your default browser
- Auto-reload on code changes

### Step 8: Test the Application

**Test Public Interface:**
1. Ask: "What is CvSU?"
2. Should see AI response with relevant FAQ
3. Try other questions about admission, grading, etc.

**Test Admin Interface:**
1. Go to `http://localhost:3000/admin/login`
2. Email: `demo@cvsu.edu.ph`
3. Password: `demo123456`
4. Should see dashboard with FAQ count
5. Try creating a new FAQ
6. Try editing or deleting FAQs

---

## Deployment

### Option 1: Deploy to Firebase Hosting (Recommended)

#### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### 2. Login to Firebase

```bash
firebase login
```

This opens a browser to authenticate with your Google account.

#### 3. Build the Application

```bash
npm run build
```

Creates optimized build in `dist/` directory.

#### 4. Initialize Firebase

```bash
firebase init
```

Follow prompts:
- Select: Firestore, Hosting
- Project: cvsu-faq (select existing)
- Firestore rules: firestore.rules
- Hosting: public directory
- Single page app: Yes (rewrite to index.html)

#### 5. Deploy

```bash
firebase deploy
```

This deploys both Firestore rules and the app.

**Your app is now live at:**
- `https://cvsu-faq-web.web.app`
- Or your custom domain if configured

### Option 2: Deploy to Vercel

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Deploy

```bash
vercel
```

Follow prompts:
- Project name: `cvsu-faq-system`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

#### 3. Environment Variables

Set in Vercel Dashboard > Settings > Environment Variables:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
... (all from .env)
```

### Option 3: Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Update package.json:
# "homepage": "https://yourusername.github.io/cvsu-faq"
# "deploy": "npm run build && gh-pages -d dist"

npm run deploy
```

---

## Admin User Management

### Add New Admin User

#### 1. Create in Firebase Authentication

1. Firebase Console > Authentication > Users
2. Click "Add user"
3. Enter email and password
4. Click "Add user"
5. Copy the UID

#### 2. Create Admin Document in Firestore

1. Firestore > admins collection
2. Create new document
3. Document ID: (paste UID)
4. Add fields:
   ```json
   {
     "email": "newadmin@cvsu.edu.ph",
     "role": "admin",
     "displayName": "New Admin Name"
   }
   ```

### Delete Admin User

#### 1. Delete from Firestore

1. Go to `admins` collection
2. Find the admin document
3. Click delete icon

#### 2. Delete from Authentication

1. Authentication > Users
2. Click the three-dot menu
3. Click "Delete user"

### Reset Admin Password

1. Firebase Console > Authentication > Users
2. Find the admin user
3. Click three-dot menu
4. Click "Reset password"
5. Send reset email to user

---

## Troubleshooting

### Issue: "Cannot find module 'firebase'"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Firebase API key not found"

**Solution:**
- Verify `.env` file exists
- Check `.env` is not in `.gitignore`
- Restart dev server: `npm run dev`

### Issue: "Firestore permission denied"

**Solution:**
- Verify firestore.rules are published
- Check admin document exists in Firestore
- Verify UID in admin document matches Firebase user

### Issue: "OpenRouter API error"

**Solution:**
- Verify API key is correct
- Check API key hasn't expired
- Visit https://openrouter.ai to verify account status
- Check internet connection

### Issue: "App won't build for deployment"

**Solution:**
```bash
# Clear cache and rebuild
npm run build -- --force

# Check for errors
npm run build 2>&1 | head -50
```

---

## Environment Variables Reference

| Variable | Example | Source |
|----------|---------|--------|
| VITE_FIREBASE_API_KEY | AIzaSy... | Firebase Console |
| VITE_FIREBASE_AUTH_DOMAIN | cvsu-faq.firebaseapp.com | Firebase Console |
| VITE_FIREBASE_PROJECT_ID | cvsu-faq | Firebase Console |
| VITE_FIREBASE_STORAGE_BUCKET | cvsu-faq.appspot.com | Firebase Console |
| VITE_FIREBASE_MESSAGING_SENDER_ID | 123456789 | Firebase Console |
| VITE_FIREBASE_APP_ID | 1:123456789:web:abc... | Firebase Console |
| VITE_OPENROUTER_API_KEY | sk-or-v1-... | OpenRouter Dashboard |

---

## Next Steps

1. ✅ Complete all setup steps above
2. 🎨 Customize branding (logo, colors, text)
3. 📚 Add more FAQs through admin dashboard
4. 📊 Monitor analytics in Firestore
5. 🚀 Deploy to production
6. 📢 Share with CvSU community

---

## Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenRouter API](https://openrouter.ai/docs)

---

**Created for Cavite State University - 2024**
