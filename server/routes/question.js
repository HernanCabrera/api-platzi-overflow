import express from 'express'

import {
  required,
  questionMiddleware
} from './../middlewares'

import { User } from './../models'

import { question } from './../db-api'

import { handleError } from './../utils'


const app = express.Router()

app.get('/', async (req, res) => {
  try {
    const { sort }  = req.query
    const questions = await question.findAll(sort)
    res.status(200).json(questions)
  } catch (error) {
    handleError(error, res)
  }
})

app.post('/', required, async (req, res) => {
  try {
    const { title, description, icon } = req.body
    
    const q = {
      title,
      description,
      icon,
      user: req.user._id
    }

    const savedQuestion = await question.create(q)

    res.status(201).json(savedQuestion)
  } catch (error) {
    handleError(error, res)
  }
})

app.get('/:id', questionMiddleware, async (req, res) => {
  try {
    const q = await question.findById(req.question)
    res.status(200).json(q)
  } catch (error) {
    handleError(error, res)
  }
})


app.post('/:id/answers', required, questionMiddleware, async (req, res) => {
  try {
    const a = req.body
    const q = req.question
    a.createdAt = +new Date()
    a.user = new User(req.user)

    const savedAnswer = await question.createAnswer(q, a)
  
    res.status(201).json(savedAnswer)
  } catch (error) {
    handleError(error, res)
  }
})

export default app