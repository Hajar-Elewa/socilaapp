import { Request, Response, NextFunction } from "express";
export declare class AuthServices {
    private userModel;
    signUp: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
    confirmEmail: (req: Request, res: Response) => Promise<Response>;
    resendOtp: (req: Request, res: Response) => Promise<Response>;
    login: (req: Request, res: Response) => Promise<Response>;
    me: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=auth.services.d.ts.map