import { z } from "zod";


export const postSchema = z.object({
  content: z.coerce.string().min(1).max(777),
});