const http = require("http");
const app = require("./app");
const config = require("config");
require("dotenv");
const port = config.server.port || 8080;
http.createServer(app).listen(port);
