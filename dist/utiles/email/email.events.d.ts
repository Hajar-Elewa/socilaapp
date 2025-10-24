import EventEmitter from "events";
export declare enum EMAIL_EVENTS_ENUM {
    VERIFY_EMAIL = "VERIFY_EMAIL",
    RESET_PASSWORD = "RESET_PASSWORD"
}
export declare class EmailEvents {
    private readonly emitter;
    constructor(emitter: EventEmitter);
    subscribe: (event: EMAIL_EVENTS_ENUM, callback: (payload: any) => void) => void;
    publish: (event: EMAIL_EVENTS_ENUM, payload: any) => void;
}
export declare const emailEmitter: EmailEvents;
//# sourceMappingURL=email.events.d.ts.map