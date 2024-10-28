import Request from "../components/Request.js";
import Response from "../components/Response.js";
import HandlerFunction from "../types/HandlerFunction.js";
import HttpMethod from "../types/HttpMethod.js";
import NextFunction from "../types/NextFunction.js";
import RequestHandler from "./RequestHandler.js";

class Middleware extends RequestHandler {
    private handler: HandlerFunction;

    constructor(handler: HandlerFunction, parent?: RequestHandler, path?: string, method?: HttpMethod, checkFullPath?: boolean) {
        super(parent, path, method, checkFullPath);
        this.handler = handler;
    }

    executeLogic(req: Request, res: Response) {
        const next: NextFunction = () => {
            this.executeNext(req, res);
        }
        this.handler(req, res, next);
    }

}

export default Middleware;