import { z } from "zod";

//validation with message
export const postSchema = z.object({
  content: z.coerce.string().min(1).max(777),
  authorId: z.coerce.number().int().positive({ message: "AuthorId must be a positive number"}),
});