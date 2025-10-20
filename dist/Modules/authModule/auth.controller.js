"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_services_1 = require("./auth.services");
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const auth_validation_1 = require("./auth.validation");
const authServices = new auth_services_1.AuthServices();
router.post('/signUp', (0, validation_middleware_1.default)(auth_validation_1.signupSchema), authServices.signUp);
exports.default = router;
//# sourceMappingURL=auth.controller.js.map