"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenException = exports.InvalidCredentialsException = exports.NotValidOtpException = exports.OtpExpiredException = exports.NotFoundException = exports.ApplicationError = void 0;
class ApplicationError extends Error {
    statusCode;
    constructor(msg, statusCode, options) {
        super(msg, options);
        this.statusCode = statusCode;
    }
}
exports.ApplicationError = ApplicationError;
class NotFoundException extends ApplicationError {
    constructor(msg = "not found") {
        super(msg, 404);
    }
}
exports.NotFoundException = NotFoundException;
class OtpExpiredException extends ApplicationError {
    constructor(msg = "otp expired") {
        super(msg, 400);
    }
}
exports.OtpExpiredException = OtpExpiredException;
class NotValidOtpException extends ApplicationError {
    constructor(msg = "not valid otp") {
        super(msg, 400);
    }
}
exports.NotValidOtpException = NotValidOtpException;
class InvalidCredentialsException extends ApplicationError {
    constructor(msg = "invalid credentials") {
        super(msg, 400);
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
class InvalidTokenException extends ApplicationError {
    constructor(msg = "invalid token") {
        super(msg, 401);
    }
}
exports.InvalidTokenException = InvalidTokenException;
//# sourceMappingURL=types.js.map