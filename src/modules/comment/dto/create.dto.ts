import z from 'zod/v3';

export const commentCreateSchema = z.object({
  content: z
    .string({
      required_error: 'Content must be required',
      invalid_type_error: 'Comment must be a string',
    })
    .min(1, 'Comment cannot be empty')
    .max(300, 'Comment is too long'),

  newsId: z
    .string({
      required_error: 'News Id must be required',
    })
    .cuid('Invalid news Id format'),
});

export type CommentCreateDto = z.infer<typeof commentCreateSchema>;
