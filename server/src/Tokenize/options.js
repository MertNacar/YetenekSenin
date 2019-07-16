var iss = "YetenekSenin";
var sub = "yeteneksenin@yetk.com.tr";
var aud = "http://yeteneksenin.com.tr";

var tokennn = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhleSIsImlhdCI6MTU2MzMwNTQ2OSwiYXVkIjoiaHR0cDovL3lldGVuZWtzZW5pbi5jb20udHIiLCJpc3MiOiJZZXRlbmVrU2VuaW4iLCJzdWIiOiJ5ZXRlbmVrc2VuaW5AeWV0ay5jb20udHIifQ.NMPPuVh8EoD1gr7gBpy8R_SN4kzNVlEE587EPqzlNOeCYH9K5kwpc6hceQJPbNEVQRPeF5F9Rbzn7FShuCSHZA"
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
  verifyOptions,
  tokennn
};
