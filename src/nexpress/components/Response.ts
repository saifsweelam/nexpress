import { ServerResponse } from "http";

class Response {
    private res: ServerResponse;

    constructor(res: ServerResponse) {
        this.res = res;
    }

    write(data: string) {
        this.res.write(data);
    }

    end() {
        this.res.end();
    }

    send(msg: string) {
        this.write(msg);
        this.end();
    }
}

export default Response;