import Nexpress from '../nexpress/index.js';
import indexRouter from './routes/index.route.js';
import productsRouter from './routes/products.route.js';

const app = new Nexpress();

app.use((req, res, next) => {
    console.log(new Date(), req.method, req.path);
    next();
})

app.use("/", indexRouter);
app.use("/products", productsRouter);

app.use((req, res, next) => {
    res.send("Global Catcher");
})

app.listen(3000, () => console.log("Listening on port 3000"));

