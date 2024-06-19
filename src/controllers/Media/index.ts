import { twitterClient } from '../../twitter/client.js';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Media {
  async uploadMedia(fileName: string) {
    try {
      // Read the image file
      const imagePath = path.join(path.resolve(__dirname, '../../media'), fileName);
      const imageData = fs.readFileSync(imagePath);

      // Upload the media to Twitter
      const mediaId = await twitterClient.v1.uploadMedia(imageData, { mimeType: 'image/png' });
      await this.saveMediaId(mediaId)

      return 'success'
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  async saveMediaId (id: string) {
    try {
      const filePath = path.join(path.resolve(__dirname, '../../library'), 'mediaIds.txt');
      const newLine = `\n${id}`

      new Promise((resolve) => fs.appendFile(filePath, newLine, 'utf-8', (err) => {
        if (err) {
          throw err
        }

        resolve('success')
      }))
    } catch (e) {
      console.log(e)
    }
  }

  async getMediaInfoById (id: string) {
    try {
      return await twitterClient.v1.mediaInfo(id)
    } catch (e) {
      console.log(e)
      return null
    }
  }

  async getMediaIds (fileName: string) {
    try {
      const filePath = path.join(path.resolve(__dirname, '../../library'), fileName);
      const parsed = fs.readFileSync(filePath, 'utf-8')

      return parsed.split('\n')
    } catch (e) {
      console.log(e)
    }
  }
}
