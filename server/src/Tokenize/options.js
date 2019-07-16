let signOptions = subject => {
  return {
    subject,
    algorithm: "RS256"
  };
};

let verifyOptions = subject => {
  return {
    subject,
    algorithm: ["RS256"]
  };
};



module.exports = {
  signOptions,
  verifyOptions
};
