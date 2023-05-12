import CustomApiError from "./CustomApiError.js";

class BadRequestError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}

export default BadRequestError;
