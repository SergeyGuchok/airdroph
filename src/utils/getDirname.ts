import {fileURLToPath} from 'url'
import { dirname } from 'path';

export const getDirname = (url) => {
  return dirname(fileURLToPath(url));
}