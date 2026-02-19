const { StatusCodes } = require("http-status-codes");
const CustomeAPIError = require("./customeApi");

class NotFoundError extends CustomeAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
