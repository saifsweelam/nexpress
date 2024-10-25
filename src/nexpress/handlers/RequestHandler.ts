import Request from '../components/Request';
import Response from '../components/Response';

abstract class RequestHandler {
    private next?: RequestHandler;

    abstract execute(req: Request, res: Response): RequestHandler;

    setNext(handler: RequestHandler): RequestHandler {
        this.next = handler;
        return handler;
    }

    executeNext(req: Request, res: Response) {
        if (this.next) {
            this.next.execute(req, res);
        }
    }
}

export default RequestHandler;