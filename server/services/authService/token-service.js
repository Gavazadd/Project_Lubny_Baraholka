const jwt = require('jsonwebtoken')
class TokenService {
  generateJwt = (id, email,  role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '3d'}
    )
  }

  validateToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_KEY);
      return userData;
    } catch (e) {
      return null;
    }
  }

}

module.exports = new TokenService()