"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const user_repo_1 = require("../../DB/repos/user.repo");
const types_1 = require("../../utiles/errors/types");
const hash_1 = require("../../utiles/secuirty/hash");
const successHandler_1 = require("../../utiles/successHandler");
const createOtp_1 = require("../../utiles/createOtp");
const generateHtml_1 = require("../../utiles/generateHtml");
const email_events_1 = require("../../utiles/email/email.events");
const token_1 = require("../../utiles/secuirty/token");
class AuthServices {
    userModel = new user_repo_1.UserRepo;
    signUp = async (req, res, next) => {
        const { firstName, lastName, email, password, age, phone } = req.body;
        const isEmailExist = await this.userModel.findByEmail({ email });
        if (isEmailExist) {
            throw new types_1.ApplicationError('email already exist', 400);
        }
        const otp = (0, createOtp_1.createOTP)()();
        const user = await this.userModel.create({
            doc: {
                firstName,
                lastName,
                email,
                password: await (0, hash_1.hash)(password),
                age: age,
                phone: phone,
                emailOtp: {
                    otp: await (0, hash_1.hash)(otp),
                    expiredAt: new Date(Date.now() + 60 * 1000)
                }
            }
        });
        const html = (0, generateHtml_1.template)({
            code: otp,
            name: `${firstName} ${lastName}`,
            subject: 'Verify your email'
        });
        email_events_1.emailEmitter.publish(email_events_1.EMAIL_EVENTS_ENUM.VERIFY_EMAIL, {
            to: email,
            subject: 'Verify your email',
            html
        });
        return (0, successHandler_1.successHandler)({ res, data: user });
    };
    confirmEmail = async (req, res) => {
        const { email, otp } = req.body;
        const user = await this.userModel.findByEmail({ email });
        if (!user) {
            throw new types_1.NotFoundException('email not found');
        }
        if (user.isVerified) {
            throw new types_1.ApplicationError('email already verified', 400);
        }
        if (!user.emailOtp.otp) {
            throw new types_1.ApplicationError('otp not found', 400);
        }
        if (user.emailOtp.expiredAt && user.emailOtp.expiredAt <= new Date(Date.now())) {
            throw new types_1.OtpExpiredException();
        }
        const isOtpValid = await (0, hash_1.compare)(otp, user.emailOtp.otp);
        if (!isOtpValid) {
            throw new types_1.NotValidOtpException();
        }
        await user.updateOne({
            $unset: {
                emailOtp: ""
            },
            isVerified: true
        });
        return (0, successHandler_1.successHandler)({ res, data: user });
    };
    resendOtp = async (req, res) => {
        const { email } = req.body;
        const user = await this.userModel.findByEmail({ email });
        if (!user) {
            throw new types_1.NotFoundException('email not found');
        }
        if (user.isVerified) {
            throw new types_1.ApplicationError('email already verified', 400);
        }
        const isExpired = user.emailOtp.expiredAt <= new Date(Date.now());
        if (!isExpired) {
            throw new types_1.ApplicationError('otp not expired', 400);
        }
        const otp = (0, createOtp_1.createOTP)()();
        const html = (0, generateHtml_1.template)({
            code: otp,
            name: `${user.firstName} ${user.lastName}`,
            subject: 'Verify your email'
        });
        email_events_1.emailEmitter.publish(email_events_1.EMAIL_EVENTS_ENUM.VERIFY_EMAIL, {
            to: email,
            subject: 'Verify your email',
            html
        });
        await user.updateOne({
            $set: {
                emailOtp: {
                    otp: await (0, hash_1.hash)(otp),
                    expiredAt: new Date(Date.now() + 60 * 1000)
                }
            }
        });
        return (0, successHandler_1.successHandler)({ res });
    };
    login = async (req, res) => {
        const { email, password, } = req.body;
        const user = await this.userModel.findByEmail({ email });
        if (!user) {
            throw new types_1.InvalidCredentialsException();
        }
        const isValidPassword = await (0, hash_1.compare)(password, user.password);
        if (!isValidPassword) {
            throw new types_1.InvalidCredentialsException();
        }
        const accessToken = (0, token_1.generateToken)({
            payload: {
                _id: user._id,
            },
            signature: process.env.ACCESS_SIGNITURE,
            options: {
                expiresIn: '1 Hour'
            }
        });
        const refreshToken = (0, token_1.generateToken)({
            payload: {
                _id: user._id,
            },
            signature: process.env.REFRESH_SIGNITURE,
            options: {
                expiresIn: '7 Days'
            }
        });
        return (0, successHandler_1.successHandler)({ res, data: {
                accessToken,
                refreshToken
            } });
    };
    me = async (req, res) => {
        const user = res.locals.user;
        return (0, successHandler_1.successHandler)({ res, data: user });
    };
}
exports.AuthServices = AuthServices;
//# sourceMappingURL=auth.services.js.map