import { model, openai } from '../../ai/openai/index.js';
import { tweetToFeed, replyToTweet, likeTweet } from '../../services/TweetService/index.js';
import { getMyUserId } from '../../services/ScalpService/index.js';
import { generateCompletion } from '../../services/AiService/index.js';
import { REQUIRED_WORDS } from '../../constants/index.js';

type State = {
  fails: number;
  successes: number;
  prompts: string[];
  generatedTweets: string[];
};

export class TweetController {
  private state: State;
  myId: string;

  constructor() {
    this.myId = '954084679744925702';
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
    const words = REQUIRED_WORDS.join(' ');

    return `${start} ${words}.` + engagement + mentionMe + emojis;
  }

  private async generateTweetFromModel() {
    try {
      const prompt = this.generateModelPrompt();

      const completion = await generateCompletion(prompt);

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

  async replyTweets(tweets: { id: string }[]) {
    try {
      const ids = tweets.map((t) => t.id);

      for await (const id of ids) {
        const prompt = this.generateModelPrompt();
        const completion = await generateCompletion(prompt);

        const { message } = completion.choices[0];
        const { content } = message;

        replyToTweet(content, id);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async likeTweets(tweets: { id: string; edit_history_tweet_ids: string[] }[] = []) {
    try {
      const ids = tweets
        .filter((t) => t.edit_history_tweet_ids.length < 2)
        .map((t) => t.id)
        .slice(0, 5);

      // if (!this.myId) {
      //   const { data } = await getMyUserId();
      //   this.myId = data.id;
      // }

      ids.forEach((id: string) => {
        likeTweet(this.myId, id);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async tweetGeneratedByModalTweet() {
    const tweet = await this.generateTweetFromModel();
    const { data } = await tweetToFeed(tweet);
    const { id } = data;

    this.likeTweets([{ id, edit_history_tweet_ids: [] }]);
  }

  getCurrentState() {
    return this.state;
  }
}
