import { OPENAI_TOKEN } from '../../config/index.js';
import { OpenAI } from 'openai';

export const model = 'ft:gpt-3.5-turbo-0125:thegamblr::9EP8Ixvp';
export const openai = new OpenAI({ apiKey: OPENAI_TOKEN });
