'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _models = require('./../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default('platzi-overflow:db-api:questions');

var findAll = function findAll() {
  var sort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-createdAt';

  debug('Finding all questions');
  return _models.Question.find().populate('answers').sort(sort);
};

var findById = function findById(_id) {
  debug('Finding question with id ' + _id);
  return _models.Question.findOne({ _id: _id }).populate({
    path: 'user'
  }).populate({
    path: 'answers',
    options: {
      sort: '-createdAt'
    },
    populate: {
      path: 'user',
      model: 'User'
    }
  });
};

var create = function create(q) {
  debug('Creating new question ' + q);
  var question = new _models.Question(q);
  return question.save();
};

var createAnswer = function createAnswer(q, a) {
  var answer = new _models.Answer(a);
  var savedAnswer = answer.save();
  q.answers.push(savedAnswer);
  q.save();
  return savedAnswer;
};

exports.default = {
  create: create,
  createAnswer: createAnswer,
  findAll: findAll,
  findById: findById
};
//# sourceMappingURL=question.js.map