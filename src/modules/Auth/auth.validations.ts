import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("invalid email format"),
    password: z.string({ required_error: "password is required" }),
  }),
});

export const authValidationsSchema={
    loginValidationSchema
}