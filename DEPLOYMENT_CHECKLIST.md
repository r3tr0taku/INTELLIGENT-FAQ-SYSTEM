# Deployment Checklist

Use this checklist to ensure everything is ready before deploying to production.

## Pre-Deployment

### Environment & Configuration
- [ ] All Firebase credentials in `.env` file
- [ ] OpenRouter API key verified and working
- [ ] `.env` file is in `.gitignore`
- [ ] No hardcoded secrets in code
- [ ] All required environment variables documented

### Firebase Setup
- [ ] Firebase project created and configured
- [ ] Authentication (Email/Password) enabled
- [ ] Firestore database created
- [ ] Firestore rules deployed and verified
- [ ] Admin user created in Authentication
- [ ] Admin document created in Firestore
- [ ] Initial FAQs imported successfully

### Application Testing
- [ ] User can ask questions and get AI responses
- [ ] Admin can login with demo credentials
- [ ] Admin can create new FAQ
- [ ] Admin can edit existing FAQ
- [ ] Admin can delete FAQ
- [ ] Related FAQs display correctly
- [ ] Chat history displays correctly
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile
- [ ] All links and buttons functional

### Code Quality
- [ ] No console.log() statements left (except errors)
- [ ] No commented-out code
- [ ] Proper error handling throughout
- [ ] Loading states display correctly
- [ ] All components properly documented

### Performance
- [ ] App builds successfully: `npm run build`
- [ ] No build warnings
- [ ] Bundle size reasonable
- [ ] Images optimized
- [ ] No memory leaks

## Deployment to Firebase Hosting

### Prerequisites
- [ ] Firebase CLI installed: `firebase --version`
- [ ] Logged into Firebase CLI: `firebase login`
- [ ] Firebase project ID correct in firebase.json

### Deployment Steps
- [ ] Run build: `npm run build`
- [ ] Preview build locally: `npm run preview`
- [ ] Deploy: `firebase deploy`
- [ ] Check deployment status
- [ ] Verify live URL is working

### Post-Deployment
- [ ] Visit live URL and test
- [ ] Ask test questions
- [ ] Admin login works on live site
- [ ] Check Firestore console for query logs
- [ ] Verify CORS not causing issues
- [ ] Check browser console for errors

## Alternative Deployment (Vercel)

- [ ] Vercel CLI installed
- [ ] GitHub repository created (if needed)
- [ ] Environment variables set in Vercel
- [ ] Deployment successful
- [ ] Live URL accessible
- [ ] All functionality working

## Post-Deployment Monitoring

### Daily Tasks
- [ ] Check for errors in Firestore
- [ ] Review query logs
- [ ] Verify FAQ database is accessible
- [ ] Monitor API usage

### Weekly Tasks
- [ ] Review popular questions
- [ ] Update FAQs based on feedback
- [ ] Check analytics in Firestore
- [ ] Review helpful feedback scores

### Monthly Tasks
- [ ] Backup Firestore data
- [ ] Review security rules
- [ ] Update AI prompts if needed
- [ ] Add new FAQs as needed

## Security Checklist

- [ ] Firestore rules properly restrict access
- [ ] Admin authentication working correctly
- [ ] API keys not exposed in frontend code
- [ ] HTTPS enabled (Firebase Hosting provides this)
- [ ] No sensitive data logged to console
- [ ] Query logging doesn't expose personal info
- [ ] Database backups working

## Documentation

- [ ] README.md is up to date
- [ ] SETUP_GUIDE.md accurate
- [ ] Environment variables documented
- [ ] Admin procedures documented
- [ ] Troubleshooting guide current

## Communication

- [ ] Admin dashboard access provided to admins
- [ ] Admin credentials shared securely
- [ ] User documentation ready
- [ ] Support channel established
- [ ] Feedback mechanism in place

## Rollback Plan

In case of issues:
- [ ] Previous version backed up
- [ ] Rollback procedure documented
- [ ] Firebase snapshot available
- [ ] Quick rollback command ready:
  ```bash
  firebase hosting:rollback
  ```

## Final Sign-Off

- [ ] Project lead approved deployment
- [ ] All stakeholders notified
- [ ] Testing completed by QA
- [ ] Documentation complete
- [ ] Support team trained
- [ ] Launch date confirmed

## Deployment Command Summary

```bash
# Local testing
npm install
npm run dev

# Prepare for deployment
npm run build
npm run preview

# Deploy to Firebase
firebase login
firebase deploy

# Deploy to Vercel
vercel --prod
```

## Success Criteria

✅ Application is accessible at live URL
✅ All features working as expected
✅ No errors in browser console
✅ No errors in Firebase logs
✅ Admin dashboard accessible
✅ FAQs loading correctly
✅ AI responses working
✅ Database queries logging successfully

---

**Deployment Date: ________________**
**Deployed By: ____________________**
**Approved By: ____________________**
