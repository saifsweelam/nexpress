import HandlerFunction from "../types/HandlerFunction";
import HandlerSequence from "./HandlerSequence";
import Middleware from "./Middleware";
import RequestHandler from "./RequestHandler";

class SingleRoute extends HandlerSequence {
    constructor(parent: RequestHandler, path: string) {
        super(parent, path, "ALL", true);
    }

    all(...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, undefined, "ALL", true, ...handlers));
        return this;
    }

    get(...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, undefined, "GET", true, ...handlers));
        return this;
    }

    post(...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, undefined, "POST", true, ...handlers));
        return this;
    }

    patch(...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, undefined, "PATCH", true, ...handlers));
        return this;
    }

    put(...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, undefined, "PUT", true, ...handlers));
        return this;
    }

    delete(...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, undefined, "DELETE", true, ...handlers));
        return this;
    }
}

export default SingleRoute;