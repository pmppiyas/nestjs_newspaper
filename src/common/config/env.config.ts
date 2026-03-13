import { z } from 'zod';

const envSchema = z.object({
  SALT_NUMBER: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  CLOUD_NAME: z.string().min(1),
  API_KEY: z.string().min(1),
  API_SECRET: z.string().min(1),
  FRONTEND_URL1: z.string().url(),
  NODE_ENV: z.string().min(1),
  CLIENT_ID: z.string().min(1),
  CLIENT_SECRET: z.string().min(1),
  CALLBACK_URL: z.string().min(1),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  NODE_ENV: parsedEnv.NODE_ENV,
  FRONTEND_URL1: parsedEnv.FRONTEND_URL1,
  BCRYPT: {
    SALT_NUMBER: parsedEnv.SALT_NUMBER,
  },
  JWT_SECRET: parsedEnv.JWT_SECRET,
  CLOUDINARY: {
    CLOUD_NAME: parsedEnv.CLOUD_NAME,
    API_KEY: parsedEnv.API_KEY,
    API_SECRET: parsedEnv.API_SECRET,
  },
  GOOGLE: {
    CLIENT_ID: parsedEnv.CLIENT_ID,
    CLIENT_SECRET: parsedEnv.CLIENT_SECRET,
    CALLBACK_URL: parsedEnv.CALLBACK_URL,
  },
};
