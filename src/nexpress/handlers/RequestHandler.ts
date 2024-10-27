import Request from '../components/Request.js';
import Response from '../components/Response.js';

abstract class RequestHandler {
    protected next?: RequestHandler;

    protected abstract executeLogic(req: Request, res: Response): void;

    execute(req: Request, res: Response): void {
        this.executeLogic(req, res);
        // this.executeNext(req, res);
    }

    setNext(handler: RequestHandler): RequestHandler {
        this.next = handler;
        return handler;
    }

    protected executeNext(req: Request, res: Response) {
        if (this.next) {
            this.next.execute(req, res);
        }
    }
}

export default RequestHandler;