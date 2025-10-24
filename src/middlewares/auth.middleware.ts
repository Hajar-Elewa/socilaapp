import { JwtPayload } from "jsonwebtoken"
import { InvalidTokenException } from "../utiles/errors/types"
import { verifyToken } from "../utiles/secuirty/token"
import { UserRepo } from "../DB/repos/user.repo"
import { Request, Response, NextFunction } from "express"
import { IUser } from "../Modules/userModule/user.types"
import 'dotenv/config'//to access env variables

export enum TokenTypesEnum {
  ACCESS = "access",
  REFRESH = "refresh"
}
export interface AuthRequest extends Request {
  user?: IUser
}//extend express request to include user property because we will add user data to request object after authentication.

const userModel = new UserRepo()
export const decodeToken = async ({
  authorization,
  tokenTypes=TokenTypesEnum.ACCESS//default token type is access
}: {
  authorization: string,
  tokenTypes: TokenTypesEnum
}) => {
  if (!authorization) {
    throw new InvalidTokenException()
  }
  if (!authorization.startsWith(process.env.BEARER as string)) {
    throw new InvalidTokenException()
  }
  const token= authorization.split(" ")[1] as string //split by space and get the second part
  const payload:JwtPayload = verifyToken({
    token,
    signature: tokenTypes == TokenTypesEnum.ACCESS  
   ? process.env.ACCESS_SIGNITURE as string
   : process.env.REFRESH_SIGNITURE as string
  })
const user = await userModel.findById({ id: payload._id })
  if (!user) {
    throw new InvalidTokenException()
}
 if (!user.isVerified) {
  throw new InvalidTokenException()
}
return user
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const data = await decodeToken({
    authorization: req.headers.authorization as string,
    tokenTypes: TokenTypesEnum.ACCESS
  })
  // req.user = data//old request object + user data
  //OR
  res.locals.user = data//store user data in res.locals to access it in controller
  return next()  
}