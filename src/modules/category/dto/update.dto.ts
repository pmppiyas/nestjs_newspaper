import { categoryCreateSchema } from '@/modules/category/dto/create.dto';
import z from 'zod/v3';

export const categoryUpdateSchema = categoryCreateSchema.partial();

export type CategoryUpdateDto = z.infer<typeof categoryUpdateSchema>;
