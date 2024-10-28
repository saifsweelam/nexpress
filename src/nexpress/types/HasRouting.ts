import Middleware from "../handlers/Middleware";
import RequestHandler from "../handlers/RequestHandler";
import SingleRoute from "../handlers/SingleRoute";
import HandlerFunction from "./HandlerFunction";

interface HasRouting {
    use: (firstParam: string | RequestHandler | HandlerFunction, ...handlers: (RequestHandler | HandlerFunction)[]) => HasRouting,
    all: (path: string, ...handlers: (Middleware | HandlerFunction)[]) => HasRouting,
    get: (path: string, ...handlers: (Middleware | HandlerFunction)[]) => HasRouting,
    post: (path: string, ...handlers: (Middleware | HandlerFunction)[]) => HasRouting,
    patch: (path: string, ...handlers: (Middleware | HandlerFunction)[]) => HasRouting,
    put: (path: string, ...handlers: (Middleware | HandlerFunction)[]) => HasRouting,
    delete: (path: string, ...handlers: (Middleware | HandlerFunction)[]) => HasRouting,
    route: (path: string) => SingleRoute
}

export default HasRouting