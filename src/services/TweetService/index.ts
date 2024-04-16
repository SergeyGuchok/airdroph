import { twitterClient } from '../../twitter/client.js';

export const tweetToFeed = async (tweet: string) => {
  return await twitterClient.v2.tweet(tweet);
};

export const replyToTweet = async (tweet: string, tweetId: string) => {
  return await twitterClient.v2.reply(tweet, tweetId);
};

export const likeTweet = async (myId: string, tweetId: string) => {
  return await twitterClient.v2.like(myId, tweetId);
};
