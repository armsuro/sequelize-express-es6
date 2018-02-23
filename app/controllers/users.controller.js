import BaseController from './base.controller';
import User from '../models/user';

class UsersController extends BaseController {

  whitelist = [
    'first_name',
    'last_name',
    'full_name',
    'company_name',
    'image',
    'email',
    'domain',
    'phone',
    'address',
    'time_zone',
    'sport_id',
    'country_code',
    'active',
    'role_id',
    'password',
    'added_user_id'
  ];


  create = async (req, res, next) => {
    const params = this.filterParams(req.body, this.whitelist);

    try {
      const savedUser = await db.user.create(params);
      res.status(201).json(savedUser);
    } catch(err) {
      err.status = 400;
      next(err);
    }
  }

  update = async (req, res, next) => {
    const newAttributes = this.filterParams(req.body, this.whitelist);
    const updatedUser = Object.assign({}, req.currentUser, newAttributes);

    try {
      const user = await db.user.update(updatedUser, {where: {id: updatedUser.id}});
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  delete = async (req, res, next) => {
    if (!req.currentUser) {
      return res.sendStatus(403);
    }

    try {
      const user = await db.user.destroy({where: {id: req.currentUser.id}});
      res.sendStatus(204);
    } catch(err) {
      next(err);
    }
  }
}

export default new UsersController();
