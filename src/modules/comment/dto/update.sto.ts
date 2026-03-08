import z from 'zod/v3';

export const commentUpdateSchema = z.object({
  commentId: z
    .string({
      required_error: 'Comment Id is required',
      invalid_type_error: 'Comment Id must be string',
    })
    .cuid("Comment Id's invalid format"),

  content: z
    .string({
      required_error: 'Content must be required',
      invalid_type_error: 'Content must be string',
    })
    .min(1, 'Comment cannot be empty')
    .max(300, 'Comment is too long'),
});

export type CommentUpdateDto = z.infer<typeof commentUpdateSchema>;
