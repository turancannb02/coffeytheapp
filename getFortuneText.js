// getFortuneText.js

import axios from 'axios';

const getFortuneText = async (prompt) => {
  try {
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

    const choice = response.data.choices[0];
    if (choice && choice.message) {
      return choice.message.content.trim();
    } else {
      throw new Error('No response choices found.');
    }
  } catch (error) {
    console.error("API request failed with error:", error.response ? error.response.data : error.message);
    return null;
  }
};

export default getFortuneText;
