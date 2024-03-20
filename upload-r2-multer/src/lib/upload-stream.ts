import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import stream from 'node:stream';

import { Upload } from '@aws-sdk/lib-storage';
import { s3 as client } from '../config/s3';
import { env } from '../env';

export const uploadStream = async (fileUploadName: string, mimetype: string) => {
  const streamPass = new stream.PassThrough();

  const params: PutObjectCommandInput = {
    Bucket: env.R2_BUCKET_NAME,
    Key: fileUploadName,
    Body: streamPass,
    ContentType: mimetype,
  };

  const streamPromise = new Upload({
    client,
    params,
  });

  return { streamPass, streamPromise };
};
