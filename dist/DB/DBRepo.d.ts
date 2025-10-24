import { Model, ProjectionType, QueryOptions, RootFilterQuery, Types } from "mongoose";
import { IUser } from "../Modules/userModule/user.types";
export declare abstract class DBRepo<T> {
    protected model: Model<T>;
    constructor(model: Model<T>);
    find: ({ filter, projection, options }: {
        filter?: RootFilterQuery<T>;
        projection?: ProjectionType<T>;
        options?: QueryOptions;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
        __v?: infer U;
    } ? T_1 : T_1 & {
        __v: number;
    } : never : never)>[]>;
    findOne: ({ filter, projection, options }: {
        filter: RootFilterQuery<T>;
        projection?: ProjectionType<T>;
        options?: QueryOptions;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
        __v?: infer U;
    } ? T_1 : T_1 & {
        __v: number;
    } : never : never)> | null>;
    findById: ({ id, projection, options }: {
        id: Types.ObjectId | string;
        projection?: ProjectionType<IUser>;
        options?: QueryOptions;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
        __v?: infer U;
    } ? T_1 : T_1 & {
        __v: number;
    } : never : never)> | null>;
    create: ({ doc }: {
        doc: Partial<T>;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, {}> & (import("mongoose").Require_id<T> extends infer T_1 ? T_1 extends import("mongoose").Require_id<T> ? T_1 extends {
        __v?: infer U;
    } ? T_1 : T_1 & {
        __v: number;
    } : never : never)>>;
}
//# sourceMappingURL=DBRepo.d.ts.map