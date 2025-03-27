import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, "Must be at least 3 characters"),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]{6,}@/, "At least 6 characters before '@'"),
  password: z
    .string()
    .min(3, "At least 6 characters")
    .regex(/[A-Z]/, "Must include 1 uppercase letter")
    .regex(/[a-z]/, "Must include 1 lowercase letter")
    .regex(/[0-9]/, "Must include 1 number")
    .regex(/[!@#$%^&*]/, "Must include 1 special character"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
