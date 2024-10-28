import Request from "../components/Request.js";
import Response from "../components/Response.js";
import HandlerFunction from "../types/HandlerFunction.js";
import HttpMethod from "../types/HttpMethod.js";
import Middleware from "./Middleware.js";
import RequestHandler from "./RequestHandler.js";

export interface HasRouting {
    use: (firstParam: string|RequestHandler|HandlerFunction, ...handlers: (RequestHandler|HandlerFunction)[]) => HasRouting,
    all: (path: string, ...handlers: (Middleware|HandlerFunction)[]) => HasRouting,
    get: (path: string, ...handlers: (Middleware|HandlerFunction)[]) => HasRouting,
    post: (path: string, ...handlers: (Middleware|HandlerFunction)[]) => HasRouting,
    patch: (path: string, ...handlers: (Middleware|HandlerFunction)[]) => HasRouting,
    put: (path: string, ...handlers: (Middleware|HandlerFunction)[]) => HasRouting,
    delete: (path: string, ...handlers: (Middleware|HandlerFunction)[]) => HasRouting,
}

class Router extends RequestHandler implements HasRouting {
    private handlers: RequestHandler[] = [];

    constructor(parent?: RequestHandler, path?: string, method?: HttpMethod, chechFullPath?: boolean, ...handlers: (RequestHandler|HandlerFunction)[]) {
        super(parent, path, method, chechFullPath);
        for (const handler of handlers) {
            const handlerObject: RequestHandler = (handler instanceof RequestHandler) ? handler : new Middleware(handler, this);
            this.addRequestHandler(handlerObject);
        }
    }

    private addRequestHandler(handler: RequestHandler) {
        if (this.handlers.length) {
            this.handlers[this.handlers.length - 1].setNext(handler);
        }
        if (this.next) {
            handler.setNext(this.next);
        }
        handler.setParent(this);
        this.handlers.push(handler);
    }

    use(firstParam: string|RequestHandler|HandlerFunction, ...handlers: (RequestHandler|HandlerFunction)[]) {
        let path: string|undefined;
        if (typeof firstParam === "string") {
            path = firstParam;
        } else {
            handlers = [ firstParam ].concat(handlers);
        }
        this.addRequestHandler(new Router(this, path, "ALL", false, ...handlers));
        return this;
    }

    all(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.addRequestHandler(new Router(this, path, "ALL", true, ...handlers));
        return this;
    }

    get(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.addRequestHandler(new Router(this, path, "GET", true, ...handlers));
        return this;
    }

    post(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.addRequestHandler(new Router(this, path, "POST", true, ...handlers));
        return this;
    }

    patch(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.addRequestHandler(new Router(this, path, "PATCH", true, ...handlers));
        return this;
    }

    put(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.addRequestHandler(new Router(this, path, "PUT", true, ...handlers));
        return this;
    }

    delete(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.addRequestHandler(new Router(this, path, "DELETE", true, ...handlers));
        return this;
    }

    executeLogic(req: Request, res: Response) {
        if (this.handlers.length) {
            this.handlers[0].execute(req, res);
        } else {
            this.executeNext(req, res);
        }
    }

    setNext(handler: RequestHandler): RequestHandler {
        if (this.handlers.length) {
            this.handlers[this.handlers.length - 1].setNext(handler);
        }
        return super.setNext(handler);
    }
}

export default Router;