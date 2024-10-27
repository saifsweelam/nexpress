import Request from "../components/Request.js";
import Response from "../components/Response.js";
import HandlerFunction from "../types/HandlerFunction.js";
import Middleware from "./Middleware.js";
import RequestHandler from "./RequestHandler.js";

class Router extends RequestHandler {
    private handlers: RequestHandler[] = [];

    private addRequestHandler(handler: RequestHandler) {
        if (this.handlers.length) {
            this.handlers[this.handlers.length - 1].setNext(handler);
        }
        if (this.next) {
            handler.setNext(this.next);
        }
        this.handlers.push(handler);
    }

    use(...handlers: (RequestHandler|HandlerFunction)[]) {
        for (const handler of handlers) {
            const handlerObject: RequestHandler = (handler instanceof RequestHandler) ? handler : new Middleware(handler);
            this.addRequestHandler(handlerObject);
        }
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