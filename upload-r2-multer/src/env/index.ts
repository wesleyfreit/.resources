import z from 'zod';

const envSchema = z.object({
  PORT: z.string().transform(Number).default('3000'),
  R2_ACCOUNT_ID: z.string(),
  R2_ACCESS_KEY_ID: z.string(),
  R2_SECRET_ACCESS_KEY: z.string(),
  R2_BUCKET_NAME: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.log('Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables');
}

export const env = _env.data;
