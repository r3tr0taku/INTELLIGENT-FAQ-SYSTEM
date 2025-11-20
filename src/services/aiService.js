const API_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "deepseek/deepseek-r1:free";

export const queryAI = async (userQuestion, relevantFAQs) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenRouter API key not configured");
  }

  const faqContext = relevantFAQs.length > 0
    ? relevantFAQs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')
    : "No specific handbook content found for this query.";

  const systemPrompt = `You are an AI assistant for Cavite State University (CvSU). 
You can ONLY answer questions based on the CvSU Student Handbook.

Here is the relevant handbook content:
${faqContext}

Rules:
- Only provide information from the handbook above
- If asked about topics outside the handbook, politely say you can only answer CvSU handbook-related questions
- Be helpful, accurate, and concise
- Reference specific policies when applicable
- Use a friendly, professional tone
- If information is not available in the handbook, suggest contacting the CvSU registrar or student affairs office`;

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://cvsu-faq.web.app",
        "X-Title": "CvSU Student Handbook FAQ",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userQuestion }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from API");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};

// Function to extract keywords from text
export const extractKeywords = (text) => {
  const stopWords = ['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'what', 'how', 'are', 'for', 'to', 'of', 'in'];
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .slice(0, 5);
};
