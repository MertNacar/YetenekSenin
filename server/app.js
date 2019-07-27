const { app,apiV } = require("./APIs/imports");



const init = require("./APIs/init");
const home = require("./APIs/home");
const login = require("./APIs/login");
const profile = require("./APIs/profile");
const search = require("./APIs/search");
const settings = require("./APIs/settings");
const signup = require("./APIs/signup");
const valideInput = require("./APIs/valideInput");
const video = require("./APIs/video");


app.use(`/${apiV}`, init,home,login,profile,search,settings,signup,valideInput,video);


module.exports = app;
