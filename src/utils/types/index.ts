import z from 'zod';
export const signupInput = z.object({
  name: z.string(),
  email: z.string().email(),
  dob: z
    .string()
    .regex(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9]|3[0-1])$/),
});

export type signupType = z.infer<typeof signupInput>;

export const PostInput = z.object({
  title: z.string().optional(),
  content: z.string(),
  image: z.string().optional(),
});

export type postType = z.infer<typeof PostInput>;

export const CommentInput = z.object({ content: z.string() });

export type CommentType = z.infer<typeof CommentInput>;
