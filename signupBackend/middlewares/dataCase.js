const lowerCaseConverter = (req, res, next) => {
  const convertedUserName = req.body.email.toLowerCase();
  req.body.email = convertedUserName;
  next();
};

module.exports = lowerCaseConverter;
