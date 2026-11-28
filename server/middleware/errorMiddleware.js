export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Not found: ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
  let statusCode = err.status || (res.statusCode === 200 ? 500 : res.statusCode);

  // Bad input is not a server error: Mongoose validation, duplicate keys and upload limits.
  if (err.name === 'ValidationError' || err.name === 'MulterError' || err.code === 11000) {
    statusCode = 400;
  }

  res.status(statusCode).json({ message: err.message });
}
