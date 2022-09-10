const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, 'a(%//5gtrds[]');

    req.user_id = decode.id;

    next();
  } catch (error) {
    if (error.name == 'TokenExpiredError') {
      res.status(401).json({
        message: 'Token Expired',
      });
    } else {
      res.json({
        message: error.message,
      });
    }
  }
};

module.exports = authenticate;
