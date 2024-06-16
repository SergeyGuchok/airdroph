import { CronJob } from 'cron';
import { TweetController } from '../../controllers/Tweet/index.js';

const Tweet = new TweetController()

const accountCronJob = new CronJob('*/30 * * * *', async () => {
  await Tweet.tweetGeneratedByModalTweet()
})

export const initialize = async () => {
  accountCronJob.start()
}