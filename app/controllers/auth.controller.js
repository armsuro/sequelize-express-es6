import BaseController from './base.controller';

class AuthController extends BaseController {
  login = async (req, res, next) => {
    const { username, password } = req.body;

      const user = await db.user.findOne({ username });

      return res.status(200).json({ user });

  }
}

export default new AuthController();
