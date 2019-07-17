var iss = "YetenekSenin";
var sub = "yeteneksenin@yetk.com.tr";
var aud = "http://yeteneksenin.com.tr";

let signOptions = () => {
  return {
    iss: iss,
    sub: sub,
    aud: aud,
    algorithm: "RS256"
  };
};

let verifyOptions = () => {
  return {
    iss: iss,
    sub: sub,
    aud: aud,
    algorithm: ["RS256"]
  };
};

module.exports = {
  signOptions,
  verifyOptions
};
