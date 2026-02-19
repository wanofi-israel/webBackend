const { UnAuthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnAuthorizedError("Please provide credentials");
  }

  const token = authorization.split(" ")[1];
  try {
    const validate = jwt.verify(token,"JWTSECRET");

    req.user={userId:validate.userId}
    console.log(validate);
    
    next()
    
    
} catch (error) {
    throw new UnAuthorizedError("Please proved credentials");
}
};

module.exports = { authenticate };
