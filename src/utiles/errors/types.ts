export interface IError extends Error{
    statusCode:number
}

export class ApplicationError extends Error {
  constructor(msg: string, public statusCode: number, options?: ErrorOptions) {
    super(msg,options)
  }
}


export class NotFoundException extends ApplicationError {
  constructor(msg: string = "not found") {
    super(msg, 404)
  }
}


export class OtpExpiredException extends ApplicationError {
  constructor(msg: string = "otp expired") {
    super(msg, 400)
  }
}


export class NotValidOtpException extends ApplicationError {
  constructor(msg: string = "not valid otp") {
    super(msg, 400)
  }
}

export class InvalidCredentialsException extends ApplicationError {
  constructor(msg: string = "invalid credentials") {
    super(msg, 400)
  }
}

export class InvalidTokenException extends ApplicationError {
  constructor(msg: string = "invalid token") {
    super(msg, 401)
  }
}