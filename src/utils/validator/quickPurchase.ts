import { z } from "zod";

export const QuickPurchaseFormSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    phoneNumber: z
        .string()
        .regex(/^0\d{10}$/, "Phone Number must be 11 digits and start with 0"),
    meterNumber: z
        .string()
        .regex(/^\d{11}$/, "Meter Number must be 11 digits"),
    estateName: z.string().min(1, "Estate Name is required"),
    amount: z
        .string()
        .regex(/^\d+$/, "Amount must be a valid number")
        .refine((val) => parseInt(val, 10) >= 1000, { message: "Minimum amount is 1000" }),
    email: z
        .string()
        .email("Invalid email format"),
});

export type QuickPurchaseFormValues = z.infer<typeof QuickPurchaseFormSchema>;