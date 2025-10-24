import { Router } from 'express'
const router = Router()
import {AuthServices} from './auth.services'
import validation from '../../middlewares/validation.middleware'
import { signupSchema , confirmEmailSchema, resendOtpSchema, loginSchema } from './auth.validation'
import { auth } from '../../middlewares/auth.middleware'
const authServices = new AuthServices()


router.post('/signUp',validation(signupSchema),authServices.signUp)
router.patch('/confirm-email',validation(confirmEmailSchema),authServices.confirmEmail)
router.patch('/resend-otp',validation(resendOtpSchema),authServices.resendOtp)
router.post('/login',validation(loginSchema),authServices.login)
router.get('/me',auth,authServices.me)
export default router