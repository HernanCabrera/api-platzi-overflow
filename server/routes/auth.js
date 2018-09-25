import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret } from './../config'
import { User } from './../models'
import {
  hashSync,
  compareSync
} from 'bcryptjs'


const app = express.Router()
const debug = new Debug('platzi-overflow:auth')

const comparePasswords = (providedPassword, userPassword) => compareSync(providedPassword, userPassword)

const handleFailed = (res, error, message) => {
  return res.status(401).json({
    message: message,
    error
  })
}

const createdToken = (user) => jwt.sign({ user }, secret, { expiresIn: 86400 })

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
  
    const user = await User.findOne({ email })

    if (!user) {
      debug(`User with email ${email} not found`)
      return handleFailed(res, error)
    }
  
    if (!comparePasswords(password, user.password)) {
      debug(`Passwords do not maych: ${password} !== ${user.password}`)
      return handleFailed(res, error, 'El correo y la contraseña no coinciden')
    }
  
    const token = createdToken(user)
  
    res.status(200).json({
      message: 'Login succeded',
      token,
      user_id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  } catch (error) {
    handleFailed(res, error, 'Login failed')
  }
})

app.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    
    const u = new User({
      firstName,
      lastName,
      email,
      password: hashSync(password, 10)
    })
  
    debug(`Creating new user: ${u}`)
  
    const user = await u.save()
  
    const token = createdToken(user)
  
    res.status(201).json({
      message: 'User saved',
      token,
      userId: user.id,
      firstName,
      lastName,
      email
    })
  } catch (error) {
    handleFailed(res, error, 'Register failed')
  }
})

export default app