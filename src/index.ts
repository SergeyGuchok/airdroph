import { initialize as ReplyInitialize } from './functions/setupConsistentRepliesByConfig/index.js'
import { initialize as TweetInitialize } from './functions/setupConsistentFeedTweetsByConfig/index.js'

try {
  // ReplyInitialize()
  TweetInitialize()
} catch (e) {
  console.error(e)
}