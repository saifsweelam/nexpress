import HandlerFunction from "../types/HandlerFunction.js";
import HasRouting from "../types/HasRouting.js";
import HandlerSequence from "./HandlerSequence.js";
import Middleware from "./Middleware.js";
import RequestHandler from "./RequestHandler.js";
import SingleRoute from "./SingleRoute.js";

class Router extends HandlerSequence implements HasRouting {
    use(firstParam: string | RequestHandler | HandlerFunction, ...handlers: (RequestHandler | HandlerFunction)[]) {
        let path: string | undefined;
        if (typeof firstParam === "string") {
            path = firstParam;
        } else {
            handlers = [firstParam].concat(handlers);
        }
        this.addRequestHandler(new HandlerSequence(this, path, "ALL", false, ...handlers));
        return this;
    }

    all(path: string, ...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, path, "ALL", true, ...handlers));
        return this;
    }

    get(path: string, ...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, path, "GET", true, ...handlers));
        return this;
    }

    post(path: string, ...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, path, "POST", true, ...handlers));
        return this;
    }

    patch(path: string, ...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, path, "PATCH", true, ...handlers));
        return this;
    }

    put(path: string, ...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, path, "PUT", true, ...handlers));
        return this;
    }

    delete(path: string, ...handlers: (Middleware | HandlerFunction)[]) {
        this.addRequestHandler(new HandlerSequence(this, path, "DELETE", true, ...handlers));
        return this;
    }

    route(path: string) {
        const singlRoute = new SingleRoute(this, path)
        this.addRequestHandler(singlRoute);
        return singlRoute;
    }
}

export default Router;