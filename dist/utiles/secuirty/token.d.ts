import jwt, { JwtPayload } from 'jsonwebtoken';
export declare const generateToken: ({ payload, signature, options, }: {
    payload: any;
    signature: string;
    options?: jwt.SignOptions;
}) => string;
export declare const verifyToken: ({ token, signature, }: {
    token: string;
    signature: string;
}) => JwtPayload;
//# sourceMappingURL=token.d.ts.map