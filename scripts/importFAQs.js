import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract keywords from text
function extractKeywords(text) {
  const stopWords = ['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'what', 'how', 'are', 'for', 'to', 'of', 'in'];
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .slice(0, 5);
}

async function importFAQs() {
  try {
    // Read environment variables
    const envPath = path.join(__dirname, '..', '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    
    envContent.split('\n').forEach(line => {
      if (line && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
          env[key.trim()] = value.trim();
        }
      }
    });

    const firebaseConfig = {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Read FAQ data
    const faqsPath = path.join(__dirname, '..', 'data', 'faqs.json');
    const faqsData = JSON.parse(fs.readFileSync(faqsPath, 'utf8'));

    console.log('Starting FAQ import...');
    
    let imported = 0;
    let skipped = 0;

    for (const faq of faqsData.faqs) {
      try {
        await addDoc(collection(db, 'faqs'), {
          question: faq.question,
          answer: faq.answer,
          category: faq.category || 'General Information',
          keywords: extractKeywords(faq.question),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          viewCount: 0
        });
        console.log(`✓ Imported: "${faq.question.substring(0, 50)}..."`);
        imported++;
      } catch (error) {
        console.error(`✗ Error importing FAQ: ${error.message}`);
        skipped++;
      }
    }
    
    console.log(`\n✓ Import complete!`);
    console.log(`  Total imported: ${imported}`);
    console.log(`  Skipped: ${skipped}`);
    process.exit(0);

  } catch (error) {
    console.error('Fatal error during import:', error);
    process.exit(1);
  }
}

importFAQs();
