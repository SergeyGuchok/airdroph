import fs from 'fs';
import path from 'path';

import { getDirname } from '../../utils/getDirname.js';

import { openai } from '../openai/index.js';

const fileId = 'file-N3OtYLNZXfCODtjsYZvC0wjb';
const jobId = 'ftjob-vQq0DYUShQiHbeuYvdhs4dA4';

export const upload = async () => {
  const dirname = getDirname(import.meta.url);
  const file = fs.createReadStream(path.join(dirname, 'conversations.jsonl'));
  return openai.files.create({ file, purpose: 'fine-tune' });
};

export const createJob = async () => {
  return openai.fineTuning.jobs.create({
    training_file: fileId,
    model: 'gpt-3.5-turbo-0125',
  });
};

export const getJobStatus = async () => {
  const res = await openai.fineTuning.jobs.retrieve(jobId);
  console.log(res);
  return openai.fineTuning.jobs.retrieve(jobId);
};
