//write an error middleware for express.js that will catch all errors and return a JSON response with the error message and the stack trace. The error middleware should be used in the app.js file.
//
//The error middleware should be placed after the routes and before the error handler.

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = errorHandler;
