import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const signUpSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  address: z.string().min(5).max(100),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
  rg: z.string().min(5).max(20),
  cpf: z.string().min(11).max(14),
});
