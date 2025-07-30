import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number),

  DB_HOST: z.string(),
  DB_PORT: z.string().transform(Number),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),

  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string(),

  BCRYPT_SALT_ROUNDS: z.string().transform(Number),

  BASE_URL: z.string(),
});

export type EnvConfig = z.infer<typeof envSchema>;

export const validateEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    process.exit(1);
  }
};
