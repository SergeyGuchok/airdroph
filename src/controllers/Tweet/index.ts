import { model, openai } from '../../ai/openai/index.js';
import { tweetToFeed } from '../../services/TweetService/index.js';

type State = {
  fails: number;
  successes: number;
  prompts: string[];
  generatedTweets: string[];
};

const requiredWords = ['$BUBBLE', '$PAC', '$PARAM', '$COOKIE', '$ZERO'];

const requireEngagement = 'Use more engagement';
const dontRequireEngagement = 'Don"t engage people to interact';
const useLessMojis = 'Use less emojis';

const ending = 'Make it unique!' + 'Mention myself';
const yes = 'Mention @kurwa';

const engage = 'Use more engagement';
const dontEngage = 'Don"t engage people to interact';
const lessEmojis = 'Use less emojis';

const string = 'Create a tweet using must-have word $BUBBLE $COOKIE $PARAM. Make it unique!';

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
    const isGreaterThanEight = Math.floor(Math.random() * 10) >= 8;

    const start = 'Create a tweet using must-have words ';
    const words = requiredWords.join(' ');
    const engagement = isGreaterThanEight ? engage : isGreaterThanFive ? '' : dontEngage;
    const end = 'Make it unique!';
    const emojis = isGreaterThanEight ? 'Use less emojis' : '';

    return `${start} ${words}. ${engagement}${engagement ? '.' : ''} ${emojis}${emojis ? '.' : ''} ${end}`;
  }

  private async generateTweetFromModel() {
    try {
      const prompt = this.generateModelPrompt();
      console.log(prompt);

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'You are active Twitter user that uses platform for crypto airdrops social farming. You are given a set of must-have words to be included. You should generate a unique fancy looking tweet. Sometimes use engaging emojis for people to comment and like the tweets. Sometimes mention to follow myself in a manner that it is a part of content. My @ is @airdropgck. Do not repeat yourself with the result tweet.',
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

      console.log(this.state);

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
