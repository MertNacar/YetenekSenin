const { app, apiV } = require("./src/APIs/imports");
const home = require("./src/APIs/home");
const login = require("./src/APIs/login");
const profile = require("./src/APIs/profile");
const search = require("./src/APIs/search");
const settings = require("./src/APIs/settings");
const signup = require("./src/APIs/signup");
const video = require("./src/APIs/video");

app.use(`/${apiV}/home`,home)
app.use(`/${apiV}/login`,login)
app.use(`/${apiV}/signup`,signup)
app.use(`/${apiV}/profile`,profile)
app.use(`/${apiV}/search`,search)
app.use(`/${apiV}/settings`,settings)
app.use(`/${apiV}/video`,video)

module.exports = app;
