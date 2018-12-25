const express = require("express");
import FileController from "../controllers/file";


module.exports = function(router, route) {

    router.route(route)
        .get()

}

