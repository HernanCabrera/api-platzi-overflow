const secret = process.env.secret || 'miclavesecreta'
const PORT = process.env.PORT || 3000
const username = 'hernan'
const password = 'f0dd46e75d0577e596f7eeb40673dd2e'

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/platzi-overflow'


export {
  secret,
  mongoUrl,
  PORT
}