import { IncomingMessage } from "http";
import { ParsedUrlQuery } from "querystring";
import url from 'url'

class Request {
    private req: IncomingMessage;
    path?: string | null
    query?: ParsedUrlQuery

    constructor(req: IncomingMessage) {
        this.req = req;
        this.setUrlProperties();
    }

    private setUrlProperties() {
        if (this.req.url) {
            const { pathname, query } = url.parse(this.req.url, true);
            this.path = pathname;
            this.query = query;
        }
    }
}

export default Request;