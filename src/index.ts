import { openai, model } from './ai/openai/index.js';
import { tweet } from './services/TweetService/index.js';
import { CronJob } from 'cron';

const requiredWords = ['$BUBBLE', '$PAC', '$PARAM', '$COOKIE', '$ZERO'];

const requireEngagement = 'I want you to engage users to like retweet and follow using text.';
const dontRequireEngagement = 'I don"t want you to engage users to like retweet and follow using text.';

const generatePrompt = () => {
  const isTrue = Math.floor(Math.random() * 10) > 5;

  return `Create a tweet using must-have word ${requiredWords.join(' ')}. ${isTrue ? requireEngagement : dontRequireEngagement}. Make it unique!`;
};

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            "You are active Twitter user that uses platform for crypto airdrops social farming. You are given a set of must-have words to be included and have to remake it in similar way. You should make it look beautiful with new-lines and emoji's as well. Do not mention or tag anyone except for when asked. You should use engaging emojis like hearts for like and recycle for follows/retweets.",
        },
        {
          role: 'user',
          content: generatePrompt(),
        },
      ],
      model,
    });

    const { message } = completion.choices[0];

    tweet(message.content);
  } catch (e) {
    console.log(e);
  }
}

const cronTween = new CronJob('*/75 * * * *', async () => {
  main();
});

cronTween.start();
