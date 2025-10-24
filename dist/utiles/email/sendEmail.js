"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const SendEmail = ({ to, subject, html }) => {
    const transportOptions = {
        host: 'smtp.ethereal.email',
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
        tls: { rejectUnauthorized: false }
    };
    const transporter = nodemailer_1.default.createTransport(transportOptions);
    const main = async () => {
        const info = await transporter.sendMail({
            from: `Social App${process.env.EMAIL}`,
            to,
            subject,
            html
        });
    };
    main().catch((error) => {
        console.log(error);
    });
};
exports.SendEmail = SendEmail;
//# sourceMappingURL=sendEmail.js.map