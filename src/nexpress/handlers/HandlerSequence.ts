import Request from "../components/Request";
import Response from "../components/Response";
import HandlerFunction from "../types/HandlerFunction";
import HttpMethod from "../types/HttpMethod";
import Middleware from "./Middleware";
import RequestHandler from "./RequestHandler";

class HandlerSequence extends RequestHandler {
    private handlers: RequestHandler[] = [];

    constructor(parent?: RequestHandler, path?: string, method?: HttpMethod, chechFullPath?: boolean, ...handlers: (RequestHandler | HandlerFunction)[]) {
        super(parent, path, method, chechFullPath);
        for (const handler of handlers) {
            const handlerObject: RequestHandler = (handler instanceof RequestHandler) ? handler : new Middleware(handler, this);
            this.addRequestHandler(handlerObject);
        }
    }

    protected addRequestHandler(handler: RequestHandler) {
        if (this.handlers.length) {
            this.handlers[this.handlers.length - 1].setNext(handler);
        }
        if (this.next) {
            handler.setNext(this.next);
        }
        handler.setParent(this);
        this.handlers.push(handler);
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

export default HandlerSequence;