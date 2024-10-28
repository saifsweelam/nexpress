import urlJoin from 'proper-url-join';
import Request from '../components/Request.js';
import Response from '../components/Response.js';
import HttpMethod from '../types/HttpMethod.js';

abstract class RequestHandler {
    protected next?: RequestHandler;
    private parent?: RequestHandler;
    protected path?: string;
    private method: HttpMethod;
    private checkFullPath: boolean;

    constructor(parent?: RequestHandler, path?: string, method?: HttpMethod, checkFullPath?: boolean) {
        this.parent = parent;
        this.path = path;
        this.method = method ?? "ALL";
        this.checkFullPath = checkFullPath ?? this.parent?.checkFullPath ?? false;
    }

    protected abstract executeLogic(req: Request, res: Response): void;

    private checkPath(req: Request): boolean {
        const path = this.getFullPath();
        const pathWithTrailingSpace = this.getFullPath(true);
        if (this.checkFullPath) {
            return req.path === path || req.path === pathWithTrailingSpace;
        } else {
            return req.path === path || req.path.startsWith(pathWithTrailingSpace);
        }
    }

    private checkMethod(req: Request) {
        return this.method === "ALL" || this.method === req.method
    }

    private getFullPath(trailingSlash: boolean = false) {
        let fullPath = "";
        let currentHandler: RequestHandler | undefined = this;
        while (currentHandler) {
            if (currentHandler.path) {
                fullPath = urlJoin(currentHandler.path, fullPath, { trailingSlash });
            }
            currentHandler = currentHandler.parent;
        }
        return fullPath || "/";
    }

    execute(req: Request, res: Response): void {
        if (this.checkPath(req) && this.checkMethod(req)) {
            this.executeLogic(req, res);
        } else {
            this.executeNext(req, res);
        }
    }

    setNext(handler: RequestHandler): RequestHandler {
        this.next = handler;
        return handler;
    }

    setParent(parent: RequestHandler) {
        this.parent = parent;
    }

    protected executeNext(req: Request, res: Response) {
        if (this.next) {
            this.next.execute(req, res);
        }
    }
}

export default RequestHandler;