import { HydratedDocument } from "mongoose";
export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    phone: string;
    profileImage: string;
    coverImages: string[];
    folderId: string;
    isVerified: boolean;
    changedCredentialsAt: Date;
    emailOtp: {
        otp: string;
        expiredAt: Date;
    };
}
export type HUserDoc = HydratedDocument<IUser>;
//# sourceMappingURL=user.types.d.ts.map