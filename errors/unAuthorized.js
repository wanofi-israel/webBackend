const { StatusCodes } = require("http-status-codes");
const CustomeAPIError = require("./customeApi");

class UnAuthorizedError extends CustomeAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnAuthorizedError;
