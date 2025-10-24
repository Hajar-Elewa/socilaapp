import z from 'zod'

//by default all of these will be `required()`
export const signupSchema = z.object({
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  age: z.number().optional(),
  phone: z.string().optional(),
})
.superRefine((args, ctx) => {//superRefine => U cane add many things to check //ctx=>collect all errors
  if (args.confirmPassword !== args.password) {
    ctx.addIssue({
      code: "custom",///custom validation ya3ne
      path: ['password', 'confirmPassword'],
      message: "password must be equal to confirm password"
    })
  }
  if (!args.email.startsWith('')) {
    ctx.addIssue({
      code: "custom",
      path: ['name'],
      message: "must start with 'hajar'"
    })
  }
})

// .refine((args) => { //refine => each one must be separated
//   return args.confirmPassword == args.password
// }, {
//   error: "password must be equal to confirm password",
//   path: ['password', 'confirmPassword']
// })

// .refine((args) => {
//   return args.email.startsWith('anas')
// }, {
//   error: "must start with 'anas'",
//   path: ['name']
// })

export const confirmEmailSchema = z.object({
  email: z.email(),
  otp: z.string().length(6)
})

export const resendOtpSchema = z.object({
  email: z.email(),
})

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
})