import * as z from 'zod';

export const ThreadValidation = z.object({
    thread: z.string().min(3, { message: "Post must be at least 3 characters long" }),
    tags: z.array(z.string()),
    tag: z.string(),
    accountId: z.string(),
})

export const CommentValidation = z.object({
    thread: z.string().min(3, { message: "Comment must be at least 3 characters long" }),
})