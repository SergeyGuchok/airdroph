import { CronJob } from 'cron';

import { TweetController } from './controllers/Tweet/index.js';

import { upload, createJob, getJobStatus } from './ai/model/index.js';

const TweetControllerInstance = new TweetController();

const cronTweet = new CronJob('*/85 * * * *', async () => {
  await TweetControllerInstance.tweetGeneratedByModalTweet();
});

const cronTweetTwo = new CronJob('*/135 * * * *', async () => {
  await TweetControllerInstance.tweetGeneratedByModalTweet();
});

cronTweet.start();
cronTweetTwo.start();

// createJob();
// upload();
// getJobStatus();

// TweetControllerInstance.tweetGeneratedByModalTweet();
