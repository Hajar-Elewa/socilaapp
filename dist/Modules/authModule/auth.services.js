"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const user_model_1 = require("../../DB/Models/user.model");
const types_1 = require("../../utiles/errors/types");
class AuthServices {
    userModel = user_model_1.UserModel;
    signUp = async (req, res, next) => {
        const { name, email, password, } = req.body;
        const isEmailExist = await this.userModel.findOne({ email });
        if (isEmailExist) {
            throw new types_1.ApplicationError('email already exist', 400);
        }
        const user = await this.userModel.create({
            email,
            password,
            name,
        });
        return res.json({
            name,
            email,
            password
        });
    };
}
exports.AuthServices = AuthServices;
//# sourceMappingURL=auth.services.js.map