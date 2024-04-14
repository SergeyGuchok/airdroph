import fs from 'fs';
import path from 'path';

import { getDirname } from '../../utils/getDirname.js';

import { openai } from '../openai/index.js';

const tweetModelFileId = 'file-ZRTZ3Db42z2FdG7FYvOLDJ5Z';
const jobId = 'ftjob-AquiYnLRxA4IXCgDgTQiMMPA';

export const upload = async () => {
  const dirname = getDirname(import.meta.url);
  const model = fs.createReadStream(path.join(dirname, 'traningModelForTweets.jsonl'));
  const file = await openai.files.create({ file: model, purpose: 'fine-tune' });
  console.log(file);
  return file;
};

export const removeModel = async (model: string) => {
  const result = await openai.models.del(model);

  console.log(result);
};

export const createJob = async () => {
  const result = await openai.fineTuning.jobs.create({
    training_file: tweetModelFileId,
    model: 'gpt-3.5-turbo-0125',
  });
  console.log(result);
  return result;
};

export const getJobStatus = async () => {
  const res = await openai.fineTuning.jobs.retrieve(jobId);
  console.log(res);
  return openai.fineTuning.jobs.retrieve(jobId);
};
