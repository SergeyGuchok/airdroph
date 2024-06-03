import { API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET, BEARER_TOKEN } from '../config/index.js';

import { TwitterApiRateLimitPlugin } from '@twitter-api-v2/plugin-rate-limit'
import { TwitterApi } from 'twitter-api-v2';

export const rateLimitPlugin = new TwitterApiRateLimitPlugin()

const client = new TwitterApi({
  appKey: API_KEY,
  appSecret: API_KEY_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_TOKEN_SECRET,
}, { plugins: [rateLimitPlugin] });

const bearer = new TwitterApi(BEARER_TOKEN, { plugins: [rateLimitPlugin] });

export const twitterClient = client.readWrite;
export const twitterBearer = bearer.readOnly;