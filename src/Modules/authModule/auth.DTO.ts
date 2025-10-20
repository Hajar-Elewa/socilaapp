//DTO =>like validation
import z from "zod"
import { signupSchema } from "./auth.validation"

export type signDto = z.infer<typeof signupSchema>
