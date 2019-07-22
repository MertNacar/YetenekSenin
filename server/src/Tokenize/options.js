var iss = "YetenekSenin";
var sub = "yeteneksenin@yetk.com.tr";
var aud = "http://yeteneksenin.com.tr";

let signOptions = () => {
  return {
    issuer: iss,
    subject: sub,
    audience: aud,
    algorithm: "RS256"
  };
};

let verifyOptions = () => {
  return {
    issuer: iss,
    subject: sub,
    audience: aud,
    algorithm: ["RS256"]
  };
};

module.exports = {
  signOptions,
  verifyOptions
};
