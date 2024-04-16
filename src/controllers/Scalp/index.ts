import { scalpTweets } from '../../services/ScalpService/index.js';

export class ScalpController {
  state: object;
  constructor() {
    this.state = {};
  }

  async scalpLastTenTweetsByString(string: string) {
    try {
      const { data } = await scalpTweets(string, {
        'tweet.fields': ['author_id', 'text'],
        expansions: 'edit_history_tweet_ids',
        max_results: 10,
      });

      return data?.data || [];
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
