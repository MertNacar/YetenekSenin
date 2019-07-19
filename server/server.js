const http = require("http");
const app = require("./app");
const config = require("config");
/* SSL CERTIFICATE 
const https = require("https");
const fs = require("fs");
var privateKey = fs.readFileSync("sslcert/server.key", "utf8");
var certificate = fs.readFileSync("sslcert/server.crt", "utf8");

var credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: config.server.https.password
};
const httpsPort = config.server.https.port || 7070;
https.createServer(credentials, app).listen(httpsPort);
*/
const httpPort = config.server.http.port || 8080;

http.createServer(app).listen(httpPort);
