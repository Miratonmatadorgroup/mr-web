import { z } from "zod";

enum Roles {
  manager = "manager",
  houseOwner = "houseOwner",
  user = "user",
}

export const RegisterUserSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    userName: z.string().min(3, "Username must be at least 3 characters long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
    email: z.string().email("Invalid email format"),
    phone: z
      .string()
      .regex(/^0\d{10}$/, "Phone must be 11 digits and start with 0")
      .optional(),
    role: z.enum(Object.values(Roles) as [string, ...string[]]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type RegisterUserValues = z.infer<typeof RegisterUserSchema>;
