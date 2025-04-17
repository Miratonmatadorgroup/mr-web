import { z } from "zod";

export const sendOtpSchema = z.object({
  email: z.string().email(),
});

export type SendOtpValues = z.infer<typeof sendOtpSchema>;

export const verifyForgotPwdOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must be numeric"),
});

export type VerifyForgotPwdOtpValues = z.infer<typeof verifyForgotPwdOtpSchema>;


export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "New Password must be at least 8 characters long")
      .regex(/[A-Z]/, "New Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "New Password must contain at least one lowercase letter")
      .regex(/\d/, "New Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "New Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
