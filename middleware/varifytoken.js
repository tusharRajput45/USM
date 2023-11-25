const jwt = require("jsonwebtoken");

// varify token

const varifyAuth = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    //   const clenedtoken = JSON.parse(token)
    if (!token) {
      throw new Error("Token not found.");
    }
    const verifiedToken = await jwt.verify(clenedtoken, "yourSecretKey");
    req.userId = verifiedToken._id;
    next();
  } catch (error) {
    res.status(401).send("Authentication failed: " + error.message);
  }
};

module.exports = varifyAuth;
