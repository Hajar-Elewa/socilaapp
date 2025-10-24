export interface IError extends Error {
    statusCode: number;
}
export declare class ApplicationError extends Error {
    statusCode: number;
    constructor(msg: string, statusCode: number, options?: ErrorOptions);
}
export declare class NotFoundException extends ApplicationError {
    constructor(msg?: string);
}
export declare class OtpExpiredException extends ApplicationError {
    constructor(msg?: string);
}
export declare class NotValidOtpException extends ApplicationError {
    constructor(msg?: string);
}
export declare class InvalidCredentialsException extends ApplicationError {
    constructor(msg?: string);
}
export declare class InvalidTokenException extends ApplicationError {
    constructor(msg?: string);
}
//# sourceMappingURL=types.d.ts.map