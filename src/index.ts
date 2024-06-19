import { initialize as ReplyInitialize } from './functions/setupConsistentRepliesByConfig/index.js'
import { initialize as TweetInitialize } from './functions/setupConsistentFeedTweetsByConfig/index.js'

import { Media } from './controllers/Media/index.js'

const MediaController = new Media()

const arr = ['cherry-1.png', 'cherry-2.png', 'cherry-3.png', 'cherry-4.png', 'cherry-5.png', 'cherry-6.png', 'cherry-7.png', 'cherry-8.png']

try {
  // const mediaIds = await MediaController.getMediaIds('mediaIds.txt')
  // ReplyInitialize()
  TweetInitialize()
} catch (e) {
  console.error(e)
}