import { twitterClient } from '../../twitter/client.js';

export const tweet = async (tweet) => {
  try {
    await twitterClient.v2.tweet(tweet);
  } catch (e) {
    console.log(e);
  }
};
