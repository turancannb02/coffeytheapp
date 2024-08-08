// getFortuneText.js

import axios from 'axios';

const getFortuneText = async (prompt) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o", // Make sure you're using the correct endpoint for chat completions
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that interprets coffee cup readings.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer sk-svcacct-PQSINgr7CZ2Y5dtHEqqWm6xrCNYHc4JRsJXT18f6cRj5FLbSV3Vl_4d_DT3BlbkFJlxqaNFKzskjKwLFaWPSkVgKE2HoMh0RKbqUaIF1T94rWQ4TrEtnG1QQAA`, // replace with your actual API key
      },
    });

    const choice = response.data.choices[0];
    if (choice && choice.message) {
      return choice.message.content.trim();
    } else {
      throw new Error('No response choices found.');
    }
  } catch (error) {
    console.error("API isteği sırasında bir hata oluştu:", error.response ? error.response.data : error.message);
    return null;
  }
};

export default getFortuneText;
