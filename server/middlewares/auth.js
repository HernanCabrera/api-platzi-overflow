import Debug from 'debug'
import { secret } from './../config'
import jwt from 'jsonwebtoken'

const debug = new Debug('platzi-overflow:auth-middleware')

const findUserByEmail = (emailSought) => users.find(({ email }) => email === emailSought)

const required = (req, res, next) => {
  jwt.verify(req.headers.token, secret, (error, token) => {
    if (error) {
      debug('JWT was not enctrypted with our secret')
      return res.status(401).json({
        message: 'Unauthorized',
        error
      })
    }

    debug(`Token verified ${token}`)
    req.user = token.user
    next()
  })
}

export {
  required,
  findUserByEmail
}