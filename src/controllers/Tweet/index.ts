import { model, openai } from '../../ai/openai/index.js';
import { tweetToFeed } from '../../services/TweetService/index.js';

type State = {
  fails: number;
  successes: number;
  prompts: string[];
  generatedTweets: string[];
};

const requiredWords = ['$BUBBLE', '$PARAM', '$COOKIE', '$BEYOND'];

export class TweetController {
  private state: State;
  constructor() {
    this.state = {
      fails: 0,
      successes: 0,
      prompts: [],
      generatedTweets: [],
    };
  }

  private generateModelPrompt() {
    const isGreaterThanFive = Math.floor(Math.random() * 10) > 5;
    const isGreaterThanEight = Math.floor(Math.random() * 10) > 8;

    const mentionMe = isGreaterThanEight ? ' Mention myself, my @ is @airdropgck.' : '';
    const engagement = isGreaterThanFive ? ' Content should engage people to interact with the tweet.' : '';
    const emojis = isGreaterThanEight ? ' Use less emojis.' : '';

    const start = 'Create a tweet using must-have words';
    const words = requiredWords.join(' ');

    return `${start} ${words}.` + engagement + mentionMe + emojis;
  }

  private async generateTweetFromModel() {
    try {
      const prompt = this.generateModelPrompt();

      const completion = await openai.chat.completions.create({
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

      const { message } = completion.choices[0];
      const { content } = message;

      this.state = {
        ...this.state,
        successes: this.state.successes + 1,
        prompts: [...this.state.prompts, prompt],
        generatedTweets: [...this.state.generatedTweets, content],
      };

      return content;
    } catch (e) {
      this.state.fails += 1;
      console.log(e);
    }
  }

  async tweetGeneratedByModalTweet() {
    const tweet = await this.generateTweetFromModel();
    await tweetToFeed(tweet);
  }

  getCurrentState() {
    return this.state;
  }
}
