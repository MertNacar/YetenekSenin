var iss = "YetenekSenin";
var sub = "yeteneksenin@yetk.com.tr";
var aud = "http://yeteneksenin.com.tr";

const signOptions = () => {
  return {
    issuer: iss,
    subject: sub,
    audience: aud,
    algorithm: "RS256"
  };
};

const verifyOptions = () => {
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
