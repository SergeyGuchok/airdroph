import type { Tweetv2SearchParams } from 'twitter-api-v2';
import { twitterClient } from '../../twitter/client.js';

export const scalpUserByUsername = async (username: string) => {
  const { data } = await twitterClient.v2.userByUsername(username);

  return data;
};

export const scalpUserTimelineByUserId = async (userId: string) => {
  const { data } = await twitterClient.v2.userTimeline(userId, { exclude: ['replies', 'retweets'], max_results: 10 });

  return data
};

export const scalpTweets = async (string: string, options: Partial<Tweetv2SearchParams>) => {
  return await twitterClient.v2.search(string, options);
};

export const getMyUserId = async () => {
  return await twitterClient.v2.me();
};
