import { createNewsSchema } from '@/modules/post/dto/create.dto';
import z from 'zod';

export const updateNewsSchema = createNewsSchema.partial();

export type UpdateNewsDto = z.infer<typeof updateNewsSchema>;
