import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("invalid email format"),
    password: z.string({ required_error: "password is required" }),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "oldPassword is required" }),
    newPassword: z.string({ required_error: "newPassword is required" }),
  }),
});

export const authValidationsSchema={
    loginValidationSchema,
    changePasswordValidationSchema
}