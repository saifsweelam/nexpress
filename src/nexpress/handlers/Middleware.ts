import Request from "../components/Request.js";
import Response from "../components/Response.js";
import HandlerFunction from "../types/HandlerFunction.js";
import NextFunction from "../types/NextFunction.js";
import RequestHandler from "./RequestHandler.js";

class Middleware extends RequestHandler {
    private handler: HandlerFunction;

    constructor(handler: HandlerFunction) {
        super();
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