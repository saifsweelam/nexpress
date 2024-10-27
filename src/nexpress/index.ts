import { Server } from "http";
import Router from "./handlers/Router.js";
import RequestHandler from "./handlers/RequestHandler.js";
import HandlerFunction from "./types/HandlerFunction.js";
import Request from "./components/Request.js";
import Response from "./components/Response.js";

class Nexpress extends Server {
    private router: Router;

    constructor() {
        super();
        this.router = new Router();
        this.on("request", (req, res) => {
            this.router.execute(new Request(req), new Response(res));
        })
    }

    use(...handlers: (RequestHandler | HandlerFunction)[]): void {
        this.router.use(...handlers);
    }
}

export default Nexpress;