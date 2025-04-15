import { z } from "zod";

export const verifyOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d{6}$/, "OTP must be numeric"),
});

export type VerifyOtpValues = z.infer<typeof verifyOtpSchema>;