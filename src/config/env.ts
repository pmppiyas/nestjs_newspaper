import { z } from 'zod';

const envSchema = z.object({
  SALT_NUMBER: z.string().min(1),
  JWT_SECRET: z.string().min(1),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  BCRYPT: {
    SALT_NUMBER: parsedEnv.SALT_NUMBER,
  },
  JWT_SECRET: parsedEnv.JWT_SECRET,
};
