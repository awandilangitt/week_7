const express = require ("express");

const bodyParser = require("body-parser");

const routes = require("./routes");

module.exports = function mainApp(ports) {
    const app = express();
    app.use(bodyParser.json());
    app.use(routes());
    app.listen(ports, () => console.log(`this app running on port ${ports}`));
};

