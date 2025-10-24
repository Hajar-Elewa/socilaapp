//DTO =>like validation
import z from "zod"
import { confirmEmailSchema, resendOtpSchema, signupSchema , loginSchema } from "./auth.validation"

export type signDto = z.infer<typeof signupSchema>
export type confirmEmailDto = z.infer<typeof confirmEmailSchema>
export type resendOtpDto = z.infer<typeof resendOtpSchema>
export type loginDto = z.infer<typeof loginSchema>