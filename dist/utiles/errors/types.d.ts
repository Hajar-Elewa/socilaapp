export interface IError extends Error {
    statusCode: number;
}
export declare class ApplicationError extends Error {
    statusCode: number;
    constructor(msg: string, statusCode: number, options?: ErrorOptions);
}
//# sourceMappingURL=types.d.ts.map