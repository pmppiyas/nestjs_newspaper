import z from 'zod/v3';

export const registerSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .min(2, 'Name must be at least 2 characters long')
    .optional(),

  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Invalid email format'),

  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password cannot exceed 20 characters'),
});

export type RegisterDto = z.infer<typeof registerSchema>;
