import { model, openai } from '../../ai/openai/index.js';

export const generateCompletion = async (prompt: string) => {
  return openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          "You are active Twitter user that uses platform for crypto airdrops social farming. You are given a set of must-have words to be included. These words start with '$' (dollar sign). You should generate a unique fancy looking tweet. Tweets should look alike but with minor differences. Do not mention any dates.",
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model,
  });
};
