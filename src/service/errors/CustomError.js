export default class CustomError {
  static createError({ name, cause, message, code }) {
    const error = new Error(message, { cause: new Error(cause) });
    error.name = name;
    error.msg = message;
    error.code = code;
    throw error;
  }
}
