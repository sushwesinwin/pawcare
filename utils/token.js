const jwt = require("jsonwebtoken");
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email, username: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
}
module.exports = { generateToken };
