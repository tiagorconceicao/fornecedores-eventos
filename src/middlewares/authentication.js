const jwt = require('jsonwebtoken');
const authSecret = process.env.AUTH_SECRET;

function generateToken (params = {}) {
  return jwt.sign( params, authSecret , { expiresIn: 604800 }); // 7 days
}

function validateToken(rawToken) {
  if (!rawToken) throw new Error("No token provided");

  const parts = String(rawToken).split(" ");
  if (parts.length != 2) throw new Error("Token error");
  
  const scheme = parts[0];
  const token = parts[1];

  if (!/^Bearer$/i.test(scheme)) throw new Error("Token malformatted");

  const decoded = jwt.verify(token, authSecret, (err, callback) => {
    if (err) throw new Error("Token invalid");
    return callback;
  });

  return decoded;
}

module.exports = {
  generateToken,
  validateToken,
}