import { API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET, BEARER_TOKEN } from '../config/index.js';

import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: API_KEY,
  appSecret: API_KEY_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_TOKEN_SECRET,
});

const bearer = new TwitterApi(BEARER_TOKEN);

export const twitterClient = client.readWrite;
export const twitterBearer = bearer.readOnly;