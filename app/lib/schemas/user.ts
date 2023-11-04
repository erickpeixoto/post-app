import { z } from "zod";

// - Only alphanumeric characters can be used for username
// - Maximum 14 characters for username

export const userSchema = z.object({
    name: z.string().max(100, { message: "Name must be 100 characters or fewer." }),
    username: z.string()
      .min(1, { message: "Username must be at least 1 character long." })
      .max(14, { message: "Username must be no longer than 14 characters." })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Username can only contain alphanumeric characters (e.g., 'john123', 'alice1985').",
      }),
  });