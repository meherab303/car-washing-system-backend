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

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "refresh token is required" }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "user email is required" }).email(),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "user email is required" }).email(),
    newPassword: z.string({ required_error: "password is required" }),
  }),
});

export const authValidationsSchema={
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema
}