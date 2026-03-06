import z from 'zod/v3';

export const categoryCreateSchema = z.object({
  name: z
    .string({
      required_error: 'Category name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1, 'Name cannot be empty')
    .max(50, 'Name is too long'),
  description: z.string().optional(),
});

export type CategoryCreateDto = z.infer<typeof categoryCreateSchema>;
