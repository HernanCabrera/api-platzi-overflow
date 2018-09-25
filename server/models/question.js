import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const QuestionSchema = Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  icon: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },

  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },

  answers: [
    {
      type: ObjectId,
      ref: 'Answer',
      default: []
    }
  ],
})

export default mongoose.model('Question', QuestionSchema)
