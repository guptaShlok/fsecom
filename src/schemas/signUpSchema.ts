// used for verification only before connecting to the database
import { z } from "zod";

const isSpecialCharacterRegex = /^[a-zA-Z0-9]+$/;

export const userNameValidation = z
  .string()
  .min(2, "Username must be at least two characters")
  .max(20, "Username must not be more than 20 characters")
  .regex(
    isSpecialCharacterRegex,
    "Username should not contain special characters"
  );

export const signUpValidation = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must be atleast 6 characters",
  }),
});
