import Request from "../components/Request";
import Response from "../components/Response";
import HandlerFunction from "../types/HandlerFunction";
import Middleware from "./Middleware";
import RequestHandler from "./RequestHandler";

class Router extends RequestHandler {
    private handlers: RequestHandler[] = [];

    private addRequestHandler(handler: RequestHandler) {
        if (this.handlers.length) {
            this.handlers[this.handlers.length - 1].setNext(handler);
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
        }
    }
}

export default Router;