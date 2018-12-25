console.clear()
const routes = require("node-tools/lib/middleware/routes")
const requestLogger = require("node-tools/lib/middleware/request-logger");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


router.use("/api/v0", routes(path.join(__dirname, "routes")));

const reverseProxy = require("node-tools/lib/middleware/reverse-proxy")
router.use(reverseProxy("http://localhost:3000"))



router.use(function errorHandler(error, request, response, next) {
    console.error("error", _.pick(error, ["name", "message", "error"]));
    return response.json(_.pick(error, ["name", "message", "error"]));
})

const basePath = process.env.BASE_PATH || "/";
app.use(basePath, router);

var PORT = 8000
app.listen(PORT, function() {
    console.log("Server started at http://localhost:" + PORT);
})


process.on("uncaughtException", error => {
    console.error(error);
    process.exit(1); // not optional
});
