import { twitterClient } from '../../twitter/client.js';

export const tweetToFeed = async (tweet: string) => {
  try {
    await twitterClient.v2.tweet(tweet);
  } catch (e) {
    console.log(e);
  }
};
