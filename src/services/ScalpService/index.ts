import { twitterClient } from '../../twitter/client.js';

export const scalpUserByUsername = async (username: string) => {
  const { data } = await twitterClient.v2.userByUsername(username);

  return data;
};

export const scalpUserTimelineByUserId = async (userId: string) => {
  return await twitterClient.v2.userTimeline(userId, { exclude: 'replies' });
};
