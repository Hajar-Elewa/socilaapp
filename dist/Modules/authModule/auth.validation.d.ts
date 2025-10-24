import z from 'zod';
export declare const signupSchema: z.ZodObject<{
    email: z.ZodEmail;
    firstName: z.ZodString;
    lastName: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    age: z.ZodOptional<z.ZodNumber>;
    phone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const confirmEmailSchema: z.ZodObject<{
    email: z.ZodEmail;
    otp: z.ZodString;
}, z.core.$strip>;
export declare const resendOtpSchema: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.validation.d.ts.map