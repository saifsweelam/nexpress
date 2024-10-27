import Router from '../nexpress/handlers/Router.js';
import Nexpress from '../nexpress/index.js';

const app = new Nexpress();

app.use((req, res, next) => {
    res.write("Hello world");
    console.log(1);
    next();
}, (req, res, next) => {
    console.log(2)
    next();
})

const appRouter = new Router();
appRouter.use((req, res, next) => {
    console.log(3);
    console.log("Hi");
    next();
})

app.use(appRouter);

app.use((req, res, next) => {
    console.log(4);
    res.send("Bye");
})

app.listen(3000, () => console.log("Listening on port 3000"));

