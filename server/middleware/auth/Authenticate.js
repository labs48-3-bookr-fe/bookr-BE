import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../../models';

dotenv.config();

const { User } = models;
/**
 * A class that handles authentication including generating and verifying user tokens.
 */
class Authenticate {
  /**
   * Generates user tokens
   * @param {int} id
   * @param {string} email
   * @param {string} userName
   * @returns {string} token
   */
  static generateToken(id, email) {
    const token = jwt.sign(
      {
        userId: id, email
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '7d'
      }
    );
    return token;
  }

  /**
   * Verifies user tokens
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {void}
   */
  static verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'No Authentication Token Provided',
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'token not verified',
        });
      }
      const { userId, email } = decoded;
      req.user = { userId, email };

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'This user does not exist'
        });
      }
      next();
    });
  }
}
export default Authenticate;
