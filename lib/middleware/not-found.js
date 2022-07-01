module.exports = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  console.log(req);
  next(err);
};
