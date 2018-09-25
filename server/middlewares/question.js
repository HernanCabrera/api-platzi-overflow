import { question } from './../db-api'
import { handleError } from './../utils'

const questionMiddleware = async (req, res, next) => {
  try {
    req.question = await question.findById(req.params.id)
    next()
  } catch (error) {
    handleError(error, res)
  }
}

export {
  questionMiddleware
}