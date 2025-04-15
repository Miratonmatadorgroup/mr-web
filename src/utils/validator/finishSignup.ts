import { z } from "zod";

export const finishSignupSchema = z.object({
    house_address: z.string().min(1, "House address is required"),
    meter_number: z.string().regex(/^\d{11}$/, "Meter number must be exactly 11 digits"),
    estate: z.string().min(1, "Estate is required"),
});

export type FinishSignupValues = z.infer<typeof finishSignupSchema>;