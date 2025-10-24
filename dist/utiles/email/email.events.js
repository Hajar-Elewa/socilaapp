"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailEmitter = exports.EmailEvents = exports.EMAIL_EVENTS_ENUM = void 0;
const events_1 = __importDefault(require("events"));
const sendEmail_1 = require("./sendEmail");
var EMAIL_EVENTS_ENUM;
(function (EMAIL_EVENTS_ENUM) {
    EMAIL_EVENTS_ENUM["VERIFY_EMAIL"] = "VERIFY_EMAIL";
    EMAIL_EVENTS_ENUM["RESET_PASSWORD"] = "RESET_PASSWORD";
})(EMAIL_EVENTS_ENUM || (exports.EMAIL_EVENTS_ENUM = EMAIL_EVENTS_ENUM = {}));
class EmailEvents {
    emitter;
    constructor(emitter) {
        this.emitter = emitter;
    }
    subscribe = (event, callback) => {
        this.emitter.on(event, callback);
    };
    publish = (event, payload) => {
        this.emitter.emit(event, payload);
    };
}
exports.EmailEvents = EmailEvents;
const emitter = new events_1.default();
exports.emailEmitter = new EmailEvents(emitter);
exports.emailEmitter.subscribe(EMAIL_EVENTS_ENUM.VERIFY_EMAIL, ({ to, subject, html }) => {
    (0, sendEmail_1.SendEmail)({ to, subject, html });
});
//# sourceMappingURL=email.events.js.map