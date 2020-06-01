module.exports = options => {
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')
  return async (req, res, next) => {
    const token = (req.headers.authorization || '').split(' ').pop()
    // assert(token != null, 401, '请先登录')
    if (!token) {
      res.status(401).send({
        message: '请先登录'
      })
    }
    const { id } = jwt.verify(token, req.app.get('SECRET'))
    if (!id) {
      res.status(401).send({
        message: '请先登录'
      })
    }
    req.user = AdminUser.findById(id)
    if (!req.user) {
      res.status(401).send({
        message: '请先登录'
      })
    }
    await next()
  }
}