"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("./Modules/routes"));
const app = (0, express_1.default)();
const connectioDB_1 = __importDefault(require("./DB/Models/connectioDB"));
const bootstrap = async () => {
    const port = process.env.PORT || 5000;
    app.use(express_1.default.json());
    await (0, connectioDB_1.default)();
    app.use('/api/v1', routes_1.default);
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({
            msg: err.message,
            stack: err.stack,
            status: err.statusCode || 500
        });
    });
    app.use((req, res) => {
        res.status(404).send('Not found');
    });
    app.listen(port, () => {
        console.log(`server running on port`, port);
    });
};
exports.default = bootstrap;
//# sourceMappingURL=bootsatrap.js.map