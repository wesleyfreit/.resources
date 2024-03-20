import { randomUUID } from 'crypto';
import { Request } from 'express';

import { uploadStream } from './upload-stream';

export class R2Storage {
  async _handleFile(
    req: Request,
    file: Express.Multer.File,
    cb: (error?: any, info?: Partial<Express.Multer.File>) => void,
  ) {
    const fileUploadName = randomUUID().concat(
      `_${file.originalname.replace(/ /g, '_')}`,
    );

    const { streamPass, streamPromise } = await uploadStream(
      fileUploadName,
      file.mimetype,
    );

    file.stream.pipe(streamPass);

    streamPromise.on('httpUploadProgress', (progress) => {
      if (progress.loaded) {
        const loadedInMB = progress.loaded / 1048576;
        console.log(`Uploaded ${loadedInMB.toFixed(2)} MB`);
      }
    });

    await streamPromise.done();
    cb(null, { path: `/${fileUploadName}` });
  }

  _removeFile(
    req: Request,
    file: Express.Multer.File,
    cb: (error?: any, info?: Partial<Express.Multer.File>) => void,
  ) {
    cb(null);
  }
}
