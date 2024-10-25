import Request from "../components/Request";
import Response from "../components/Response";
import NextFunction from "./NextFunction";

type HandlerFunction = (req: Request, res: Response, next: NextFunction) => any;

export default HandlerFunction;