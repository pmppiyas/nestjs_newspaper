import * as z from 'zod/v3';

export const createNewsSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(5, 'Title too short')
    .max(250, 'Title cannot exceed 250 characters'),

  content: z
    .string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string',
    })
    .min(10, 'Content must be descriptive'),

  imageUrl: z
    .string({
      invalid_type_error: 'Image URL must be a string',
    })
    .url('Invalid image URL format')
    .optional()
    .or(z.literal('')),

  categoryId: z
    .string({
      required_error: 'Category ID is required',
      invalid_type_error: 'Category ID must be a string',
    })
    .cuid('Invalid Category Id format'),

  tags: z
    .array(
      z.string({
        invalid_type_error: 'Each tag must be a string',
      }),
      {
        invalid_type_error: 'Tags must be an array of strings',
      },
    )
    .optional(),
});

export type CreateNewsDto = z.infer<typeof createNewsSchema>;
