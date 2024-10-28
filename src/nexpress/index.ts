import { Server } from "http";
import Router, { HasRouting } from "./handlers/Router.js";
import RequestHandler from "./handlers/RequestHandler.js";
import HandlerFunction from "./types/HandlerFunction.js";
import Request from "./components/Request.js";
import Response from "./components/Response.js";
import Middleware from "./handlers/Middleware.js";

class Nexpress extends Server implements HasRouting {
    private router: Router;

    constructor() {
        super();
        this.router = new Router();
        this.on("request", (req, res) => {
            this.router.execute(new Request(req), new Response(res));
        })
    }

    use(firstParam: string|RequestHandler|HandlerFunction, ...handlers: (RequestHandler|HandlerFunction)[]) {
        this.router.use(firstParam, ...handlers);
        return this;
    }

    all(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.router.all(path, ...handlers);
        return this;
    }

    get(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.router.get(path, ...handlers);
        return this;
    }

    post(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.router.post(path, ...handlers);
        return this;
    }

    patch(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.router.patch(path, ...handlers);
        return this;
    }

    put(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.router.put(path, ...handlers);
        return this;
    }

    delete(path: string, ...handlers: (Middleware|HandlerFunction)[]) {
        this.router.delete(path, ...handlers);
        return this;
    }
}

export default Nexpress;