const http = require("http");
const app = require("./app");
require('dotenv');
const port = process.env.PORT || 8080

http.createServer(app).listen(port);