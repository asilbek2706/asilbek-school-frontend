import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().email("Email noto‘g‘ri formatda"),
  password: z.string().min(8, "Parol kamida 8 ta belgidan iborat bo‘lishi kerak"),
});

export const RegisterSchema = z
  .object({
    fullName: z.string().trim().min(3, "Kamida 3 ta belgi kiriting"),
    email: z.string().trim().email("Email noto‘g‘ri formatda"),
    password: z.string().min(8, "Parol kamida 8 ta belgidan iborat bo‘lishi kerak"),
    confirmPassword: z.string().min(8, "Parolni qayta kiriting"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Parollar mos kelmadi",
    path: ["confirmPassword"],
  });

export const VerifySchema = z.object({
  email: z.string().trim().email("Email noto‘g‘ri formatda"),
  code: z.string().trim().regex(/^\d{6}$/, "Kod 6 ta raqamdan iborat bo‘lishi kerak"),
  verificationId: z.string().optional(),
  purpose: z.enum(["register", "login"]),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type VerifyFormValues = z.infer<typeof VerifySchema>;
