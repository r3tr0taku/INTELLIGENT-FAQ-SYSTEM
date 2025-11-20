import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebase';
import { extractKeywords } from './aiService';

export const searchFAQs = async (searchText) => {
  try {
    const keywords = searchText.toLowerCase().split(/\s+/);
    const faqsRef = collection(db, 'faqs');
    
    const snapshot = await getDocs(faqsRef);
    const results = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(faq => 
        keywords.some(keyword => 
          (faq.question && faq.question.toLowerCase().includes(keyword)) ||
          (faq.answer && faq.answer.toLowerCase().includes(keyword)) ||
          (faq.keywords && faq.keywords.some(k => k.includes(keyword)))
        )
      )
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 5);
    
    return results;
  } catch (error) {
    console.error('Error searching FAQs:', error);
    throw error;
  }
};

export const getAllFAQs = async () => {
  try {
    const faqsRef = collection(db, 'faqs');
    const snapshot = await getDocs(faqsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
};

export const createFAQ = async (faqData) => {
  try {
    const faqsRef = collection(db, 'faqs');
    const docRef = await addDoc(faqsRef, {
      ...faqData,
      keywords: extractKeywords(faqData.question),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      viewCount: 0
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating FAQ:', error);
    throw error;
  }
};

export const updateFAQ = async (id, faqData) => {
  try {
    const faqRef = doc(db, 'faqs', id);
    await updateDoc(faqRef, {
      ...faqData,
      keywords: extractKeywords(faqData.question),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    throw error;
  }
};

export const deleteFAQ = async (id) => {
  try {
    await deleteDoc(doc(db, 'faqs', id));
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    throw error;
  }
};

export const logQuery = async (question, answer, relatedFAQs) => {
  try {
    const logsRef = collection(db, 'queryLogs');
    await addDoc(logsRef, {
      question,
      answer,
      relatedFAQCount: relatedFAQs.length,
      timestamp: serverTimestamp(),
      wasHelpful: null,
      userId: 'anonymous'
    });
  } catch (error) {
    console.error('Error logging query:', error);
    // Don't throw - this shouldn't break the user experience
  }
};

export const incrementViewCount = async (faqId) => {
  try {
    const faqRef = doc(db, 'faqs', faqId);
    const faqSnapshot = await getDocs(query(collection(db, 'faqs')));
    const faqDoc = faqSnapshot.docs.find(d => d.id === faqId);
    
    if (faqDoc) {
      const currentCount = faqDoc.data().viewCount || 0;
      await updateDoc(faqRef, {
        viewCount: currentCount + 1
      });
    }
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
};

export const markFeedback = async (queryLogId, isHelpful) => {
  try {
    const logRef = doc(db, 'queryLogs', queryLogId);
    await updateDoc(logRef, {
      wasHelpful: isHelpful
    });
  } catch (error) {
    console.error('Error marking feedback:', error);
  }
};

export const getFAQsByCategory = async (category) => {
  try {
    const faqsRef = collection(db, 'faqs');
    const snapshot = await getDocs(faqsRef);
    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(faq => faq.category === category);
  } catch (error) {
    console.error('Error fetching FAQs by category:', error);
    throw error;
  }
};
