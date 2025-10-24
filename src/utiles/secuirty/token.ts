import jwt, { JwtPayload } from 'jsonwebtoken'

export const generateToken = ({
  payload = {},
  signature,
  options = {},
}: {
  payload: any,
  signature: string,
  options?: jwt.SignOptions
}) => {
  return jwt.sign(payload, signature, options)//sign=> creates token 
}

export const verifyToken = ({
  token,
  signature,
}: {
  token: string,
  signature: string,
}):JwtPayload => {//because TS needs to know what type of data will be returned so we are specifying JwtPayload.
  return jwt.verify(token, signature) as JwtPayload//verify=>decode token :: checks token validity [means if token is tampered or expired] as JwtPayload 
}