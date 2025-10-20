import { ZodObject } from "zod";
import { NextFunction, Request, Response } from "express";
declare const validation: (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default validation;
//# sourceMappingURL=validation.middleware.d.ts.map