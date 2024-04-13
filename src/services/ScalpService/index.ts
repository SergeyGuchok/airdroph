import { twitterClient, twitterBearer } from '../../twitter/client.js';

export const scalpUserTweets = async () => {
  const user = await twitterClient.v2.userByUsername('Diamondweb_3')
  return await twitterClient.v2.userTimeline(user.data.id, { exclude: 'replies' })
}