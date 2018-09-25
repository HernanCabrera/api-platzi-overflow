import Debug from 'debug'
import { Question, Answer } from './../models'

const debug = new Debug('platzi-overflow:db-api:questions')

const findAll = (sort = '-createdAt') => {
  debug('Finding all questions')
  return Question.find().populate('answers').sort(sort)
}

const findById = (_id) => {
  debug(`Finding question with id ${_id}`)
  return Question
    .findOne({ _id })
    .populate({
      path: 'user',
    })
    .populate({
      path: 'answers',
      options: {
        sort: '-createdAt'
      },
      populate: {
        path: 'user',
        model: 'User',
      }
    })
}

const create = (q) => {
  debug(`Creating new question ${q}`)
  const question = new Question(q)
  return question.save()
}

const createAnswer = async (q, a) => {
  const answer = new Answer(a)
  const savedAnswer = await answer.save()
  q.answers.push(savedAnswer)
  await q.save()
  return savedAnswer
}

export default {
  create,
  createAnswer,
  findAll,
  findById
}