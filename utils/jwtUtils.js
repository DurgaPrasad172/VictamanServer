const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    username: user.username,
    isAdmin: user.isAdmin,
  };

  const options = {
    expiresIn: '1h', // Token expiration time
  };

  return jwt.sign(payload, 'ABCDEFGHIJ', options);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, 'ABCDEFGHIJ');
  } catch (error) {
    throw error;
  }
};

module.exports = { generateToken, verifyToken };
