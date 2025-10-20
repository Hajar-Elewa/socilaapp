import { Request,Response,NextFunction } from "express"
import { signDto } from "./auth.DTO"
import { IUser } from "../userModule/user.types"
import { Model } from "mongoose"
import { UserModel } from "../../DB/Models/user.model"
import { ApplicationError } from "../../utiles/errors/types"


export class AuthServices {
 private readonly userModel: Model<IUser> = UserModel

//this in arrow function not only has access in it's function scope but also all the class.
signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const {
    name,
    email,
    password,
  }:signDto = req.body

const isEmailExist = await this.userModel.findOne({ email });
if (isEmailExist) {
  throw new ApplicationError('email already exist', 400);
}

  const user = await this.userModel.create({
    email,
    password,
    name,
  })

    return res.json({
      name,
      email,
      password
    })
  }
}