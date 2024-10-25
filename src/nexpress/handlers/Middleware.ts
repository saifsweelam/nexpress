import Request from "../components/Request";
import Response from "../components/Response";
import HandlerFunction from "../types/HandlerFunction";
import NextFunction from "../types/NextFunction";
import RequestHandler from "./RequestHandler";

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