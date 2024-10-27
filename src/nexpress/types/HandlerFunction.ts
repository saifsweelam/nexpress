import Request from "../components/Request.js";
import Response from "../components/Response.js";
import NextFunction from "./NextFunction.js";

type HandlerFunction = (req: Request, res: Response, next: NextFunction) => any;

export default HandlerFunction;