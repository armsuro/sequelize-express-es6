import DB from './database';
export default function authenticate(req, res, next) {
    DB.access_token.findOne({
        where: {
            token: req.headers['access-token'],
        },
    }).then((user) => {
        req.user_id = user.id;
        return next();
    }).catch((err) => {
        return next(err);
    });
}
