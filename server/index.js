import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { mongoUrl } from './config'


const PORT = 5000
const debug = new Debug('platzi-overflow:root')

const start = async () => {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  
  app.listen(PORT, () => {
    debug(`Server running at port ${PORT}`)
  })
}


start()