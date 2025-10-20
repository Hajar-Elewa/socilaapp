import { Router } from 'express'
const router = Router()
import {AuthServices} from './auth.services'
import validation from '../../middlewares/validation.middleware'
import { signupSchema } from './auth.validation'
const authServices = new AuthServices()

router.post('/signUp',validation(signupSchema),authServices.signUp)

export default router