import { Request,Response,NextFunction } from "express"
import { signDto ,confirmEmailDto, resendOtpDto, loginDto } from "./auth.DTO"
import { UserRepo } from "../../DB/repos/user.repo"
import { ApplicationError, NotFoundException , OtpExpiredException , NotValidOtpException,InvalidCredentialsException } from "../../utiles/errors/types"
import { compare, hash  } from '../../utiles/secuirty/hash'
import { successHandler } from "../../utiles/successHandler"
import { createOTP } from "../../utiles/createOtp"
import {template} from '../../utiles/generateHtml'
import { EMAIL_EVENTS_ENUM, emailEmitter } from "../../utiles/email/email.events"
import { generateToken } from "../../utiles/secuirty/token"
import { AuthRequest } from "../../middlewares/auth.middleware"
import { HUserDoc} from "../userModule/user.types"


export class AuthServices {
 private userModel=new UserRepo

//'this' in arrow function not only has access in it's function scope but also in all the class.
signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const {
      firstName,
      lastName,
      email,
      password,
      age,
      phone
  }:signDto = req.body

const isEmailExist = await this.userModel.findByEmail({email})
if (isEmailExist) {
  throw new ApplicationError('email already exist', 400)
}
const otp = createOTP()()
  const user = await this.userModel.create({
    doc:{
      firstName,
      lastName ,
      email,
      password: await hash(password),
      age : age as number,
      phone : phone as string, //to ignore 'undefined'
      emailOtp: {
      otp: await hash(otp),
      expiredAt:new Date(Date.now() + 60* 1000) //10 minutes
}
  }
  })

  const html = template({
  code: otp,
  name: `${firstName} ${lastName}`,
  subject: 'Verify your email'
})

emailEmitter.publish(EMAIL_EVENTS_ENUM.VERIFY_EMAIL, {
  to: email,
  subject: 'Verify your email',
  html
})
    return successHandler({res,data:user})
}
confirmEmail = async (req: Request, res: Response): Promise<Response> => {
  const {
    email,
    otp
  }:confirmEmailDto = req.body

  const user = await this.userModel.findByEmail({ email })
  if (!user) {
    throw new NotFoundException('email not found')
  }

  if (user.isVerified) {
    throw new ApplicationError('email already verified', 400)
  }

  if (!user.emailOtp.otp) {
    throw new ApplicationError('otp not found', 400)
  }

  if (user.emailOtp.expiredAt && user.emailOtp.expiredAt <= new Date(Date.now())) {
    throw new OtpExpiredException()
  }

  const isOtpValid = await compare(otp, user.emailOtp.otp)
  if (!isOtpValid) {
    throw new NotValidOtpException()
  }
  
  await user.updateOne({
  $unset: {
    emailOtp: ""
  },
  isVerified: true
})
   return successHandler({res,data:user})
}
resendOtp = async (req: Request, res: Response): Promise<Response> => {
  const {
    email
  }: resendOtpDto = req.body

  const user = await this.userModel.findByEmail({ email })
  if (!user) {
    throw new NotFoundException('email not found')
  }

  if (user.isVerified) {
    throw new ApplicationError('email already verified', 400)
  }

  const isExpired = user.emailOtp.expiredAt <= new Date(Date.now())
  if (!isExpired) {
    throw new ApplicationError('otp not expired', 400)
  }
  const otp = createOTP()()
  const html = template({
  code: otp,
  name: `${user.firstName} ${user.lastName}`,
  subject: 'Verify your email'
})
emailEmitter.publish(EMAIL_EVENTS_ENUM.VERIFY_EMAIL, {
  to: email,
  subject: 'Verify your email',
  html
})
await user.updateOne({
  $set: {
    emailOtp: {
      otp: await hash(otp),
      expiredAt: new Date(Date.now() + 60 * 1000)
    }
  }
})

  return successHandler({ res})
}
login = async (req: Request, res: Response): Promise<Response> => {
  const {
    email,
    password,
  }: loginDto = req.body

  const user = await this.userModel.findByEmail({ email })
  if (!user) {
    throw new InvalidCredentialsException()
  }

  const isValidPassword = await compare(password, user.password)
  if (!isValidPassword) {
    throw new InvalidCredentialsException()
  }
//use 'InvalidCredentialsException' for both email and invalid password to avoid giving hints to attackers

const accessToken = generateToken({
  payload: {
    _id: user._id,
  },
  signature: process.env.ACCESS_SIGNITURE as string,
  options: {
    expiresIn: '1 Hour'
  }
})
const refreshToken = generateToken({
  payload: {
    _id: user._id,
  },
  signature: process.env.REFRESH_SIGNITURE as string,
  options: {
    expiresIn: '7 Days'
  }
})

return successHandler({ res,data: {
            accessToken,
            refreshToken
        }})
}
me = async (req: Request, res: Response) => {
  const user:HUserDoc = res.locals.user//HydratedDocument=> mongoose document with all methods and properties.+ type IUser
  // user.firstName=user?.firstName+' updated' as string
  // await user.save()
  return successHandler({ res, data: user })
}
}