const appError = require('../utils/appError')

const isCoach = (req, res, next) => {
  // 401, '使用者尚未成為教練'
  if (!req.user || req.user.role !== 'COACH') {
    next(appError(401, '使用者尚未成為教練'))
    return;
  }
  next()
}

module.exports = isCoach