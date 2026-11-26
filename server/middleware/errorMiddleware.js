export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Not found: ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.status || (res.statusCode === 200 ? 500 : res.statusCode);
  res.status(statusCode).json({ message: err.message });
}
