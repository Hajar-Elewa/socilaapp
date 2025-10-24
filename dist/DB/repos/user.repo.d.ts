import { Model, ProjectionType, QueryOptions } from "mongoose";
import { IUser } from "../../Modules/userModule/user.types";
import { DBRepo } from "../DBRepo";
export declare class UserRepo extends DBRepo<IUser> {
    protected model: Model<IUser>;
    constructor(model?: Model<IUser>);
    findByEmail: ({ email, projection, options, }: {
        email?: string;
        projection?: ProjectionType<IUser>;
        options?: QueryOptions;
    }) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
//# sourceMappingURL=user.repo.d.ts.map