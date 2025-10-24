import { ZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

const validation = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = {
      ...req.body,
      ...req.params,
      ...req.query
    }
    const validationRes = await schema.safeParseAsync(data)//by default `abortEarly=>false` [show all errors in the same time]
    if (!validationRes.success) {
      return res.status(422).json({
     validationErr: JSON.parse(validationRes.error as unknown as string)
      })
    }
    next()
  }
}
export default validation