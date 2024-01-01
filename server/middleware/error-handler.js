const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = res.statusCode ? res.statusCode : 400;

  console.log(statusCode);

  res.status(statusCode).json({
    message: err.message,
  });
};

module.exports = {
  errorHandler,
};
