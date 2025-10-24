import { Model, ProjectionType, QueryOptions } from "mongoose"
import { IUser } from "../../Modules/userModule/user.types"
import { DBRepo } from "../DBRepo"
import { UserModel } from "../Models/user.model"


export class UserRepo extends DBRepo<IUser> {
  constructor(protected model: Model<IUser> = UserModel) {
    super(UserModel)
  }

  findByEmail = async (
    {
      email,
      projection = {},
      options = {},
    }: {
      email?: string,
      projection?: ProjectionType<IUser>,
      options?: QueryOptions,
    }
  ) => {
    const doc = await this.model.findOne({ email }, projection, options)
    return doc
  }
}