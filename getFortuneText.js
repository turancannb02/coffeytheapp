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
      max_tokens: 5,
      temperature: 0.1,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`, // replace with your actual API key
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
