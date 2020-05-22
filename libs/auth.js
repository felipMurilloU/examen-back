const jwt = require('./jwt')
module.exports = (db) => async (ctx, res, next) => {
  if ('authorization' in ctx.headers) {
    try {
      let payload = await jwt.verify(ctx.headers['authorization'])
      let user = await db.users.findByPk(payload.id);
      if (!user.active) {
        res.status(401).send({
          message: 'Disabled user',
          sessionExpired: false
        });
        return next();
      }
      return next()
    } catch (error) {
      if (error.message === 'jwt expired') {
        res.status(401).send({
          message: 'Session expired',
          sessionExpired: false
        });
        return next();
      } else {
        res.status(401).send({
          message: 'Invalid token',
          sessionExpired: false
        });
        return next();
      }
      console.error('Auth middleware Error: \n', error)
    }
  } else {
    res.status(401).send({
      message: 'Unauthorized',
      sessionExpired: false
    });
    return next();
  }
}