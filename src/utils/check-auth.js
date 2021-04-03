const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET);
    req.decoded = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth Failed' });
  }
};
