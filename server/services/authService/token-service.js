const jwt = require('jsonwebtoken')
class TokenService {
  generateJwt = (id, email, isActivated, role) => {
    return jwt.sign({id, email, isActivated, role}, process.env.SECRET_KEY, {expiresIn: '3d'}
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