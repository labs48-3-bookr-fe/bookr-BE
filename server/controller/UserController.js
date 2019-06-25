/* eslint-disable no-unused-vars */
import models from '../models';
import Authenticate from '../middleware/auth/Authenticate';

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
    const {
      firstName, lastName, email, password, gender
    } = req.body;

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        gender,
        password
      }
    });
    if (!created) {
      return res.status(400).json({
        status: 400,
        error: 'This user already exists',
      });
    }

    const token = Authenticate.generateToken(user.id, user.email, user.userName);

    return res.status(201).json({
      status: res.statusCode,
      message: 'user registration was successful',
      user,
      token,
    });
  }
}

export default UserController;
