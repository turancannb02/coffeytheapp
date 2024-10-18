// getFortuneText.js

import i18n from './i18n';
import axios from 'axios';

const getFortuneText = async (prompt) => {
  try {
    const language = i18n.language;
    const systemContent = language === 'en' 
      ? "You are a mysterious coffee fortune teller. Address the user directly in a mysterious and intriguing tone. Don't use greetings or introductions. Don't use markdown formatting in your response. Always use the user's name and zodiac sign."
      : "Sen gizemli bir kahve falı bakıcısısın. Kullanıcıya doğrudan, gizemli ve ilgi çekici bir tonda hitap et. Selamlaşma veya giriş cümleleri kullanma. Yanıtında markdown biçimlendirmesi kullanma. Kullanıcının adını ve burcunu mutlaka kullan.";

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o", // only 4 or 4o
      messages: [
        {
          role: "system",
          content: "Sen gizemli bir kahve falı bakıcısısın. Kullanıcıya doğrudan, gizemli ve ilgi çekici bir tonda hitap et. Selamlaşma veya giriş cümleleri kullanma. Yanıtında markdown biçimlendirmesi kullanma. Kullanıcının adını ve burcunu mutlaka kullan.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    /*
      keeping the tokens at "5" and temp at 0.1 to avoid unnecessary usage of tokens also money in the acc
    */
      max_tokens: 500,
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
      },
    });

    let fortuneText = response.data.choices[0].message.content.trim();

    // If the app language is English but the fortune is in Turkish, translate it
    if (language === 'en' && !/^[a-zA-Z\s.,!?]+$/.test(fortuneText)) {
      fortuneText = await translateText(fortuneText, 'en');
    }

    return fortuneText;
  } catch (error) {
    console.error("API request failed with error:", error.response ? error.response.data : error.message);
    return null;
  }
};

async function translateText(text, targetLanguage) {
  // Implement translation logic here, using a translation API
  // For example, you could use Google Translate API or another service
  // Return the translated text
}

export default getFortuneText;
