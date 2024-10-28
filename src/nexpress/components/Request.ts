import { IncomingMessage } from "http";
import { ParsedUrlQuery } from "querystring";
import url from 'url'

class Request {
    private req: IncomingMessage;
    path: string
    query: ParsedUrlQuery

    constructor(req: IncomingMessage) {
        this.req = req;
        this.req.url = this.req.url ?? "/";
        const { pathname, query } = url.parse(this.req.url, true);
        this.path = pathname ?? "/";
        this.query = query;
    }

    get method() {
        return this.req.method;
    }
}

export default Request;