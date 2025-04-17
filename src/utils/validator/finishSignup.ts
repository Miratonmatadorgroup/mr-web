import { z } from "zod";

export const finishSignupSchema = z.object({
    house: z.string().min(1, "House is required").optional(),
    meter_number: z.string().regex(/^\d{11}$/, "Meter number must be exactly 11 digits"),
    estate: z.string().min(1, "Estate is required"),
    email: z.string().email("Invalid email address"),
});

export type FinishSignupValues = z.infer<typeof finishSignupSchema>;