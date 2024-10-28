import Router from "../../nexpress/handlers/Router.js";

const router = new Router();

router.get("/", (req, res, next) => {
    res.send("Index");
})

router.use("/", (req, res, next) => {
    res.send("Hey it's me again");
})

router.get("/man", (req, res, next) => {
    res.send("Mannnn");
})

router.route("/home")
    .get((req, res, next) => {
        res.send("Welcome home !!!!!!")
    })

export default router;