import models from '../models';
import Authenticate from '../middleware/auth/Authenticate';
import Helper from '../middleware/helper';

const { User } = models;

/**
 * A class that handles user methods
 * */
class UserController {
  /**
   * register a user
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async signUp(req, res, next) {
    try {
      const {
        firstName, lastName, email, password
      } = req.body;

      const hashedPassword = Helper.encryptPassword(password);

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          firstName,
          lastName,
          email,
          password: hashedPassword
        }
      });
      if (!created) {
        return res.status(400).json({
          status: 400,
          error: 'This user already exists',
        });
      }

      const token = Authenticate.generateToken(user.id, user.email);
      return res.status(201).json({
        status: res.statusCode,
        message: 'user registration was successful',
        user,
        token,
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * login a registered user
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } }).catch(next);

      if (!user) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'Invalid email or password',
        });
      }

      const passwordsMatch = Helper.comparePassword(password, user.password);
      if (!passwordsMatch) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'Invalid email or password',
        });
      }

      const token = Authenticate.generateToken(user.id, user.email);
      return res.status(200).json({
        status: res.statusCode,
        message: 'login was sucessful',
        user,
        token
      });
    } catch (e) {
      next(e);
    }
  }
}
export default UserController;
