import { CronJob } from 'cron';

import { TweetController } from './controllers/Tweet/index.js';
import { ScalpController } from './controllers/Scalp/index.js';

import { REQUIRED_WORDS } from './constants/index.js';

const TweetControllerInstance = new TweetController();
const ScalpControllerInstance = new ScalpController();

const cronTweet = new CronJob('*/85 * * * *', async () => {
  await TweetControllerInstance.tweetGeneratedByModalTweet();
});

const scalpReplyAndLike = new CronJob('*/60 * * * *', async () => {
  const string = `(${REQUIRED_WORDS.map((e) => `"${e}"`).join(' OR ')}) is:verified -is:reply -is:retweet`;

  const tweets = await ScalpControllerInstance.scalpLastTenTweetsByString(string);
  await TweetControllerInstance.replyTweets(tweets);
  await TweetControllerInstance.likeTweets(tweets);
});

cronTweet.start();
scalpReplyAndLike.start();
