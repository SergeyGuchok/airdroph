import { CronJob } from 'cron';

import { TweetController } from './controllers/Tweet/index.js';

import { upload, createJob, getJobStatus } from './ai/model/index.js';

const TweetControllerInstance = new TweetController();

const cronTween = new CronJob('*/75 * * * *', async () => {
  await TweetControllerInstance.tweetGeneratedByModalTweet();
});

cronTween.start();

// createJob();
