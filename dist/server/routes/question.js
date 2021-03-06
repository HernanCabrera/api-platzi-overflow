'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middlewares = require('./../middlewares');

var _models = require('./../models');

var _dbApi = require('./../db-api');

var _utils = require('./../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = _express2.default.Router();

app.get('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var sort, questions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            sort = req.query.sort;
            _context.next = 4;
            return _dbApi.question.findAll(sort);

          case 4:
            questions = _context.sent;

            res.status(200).json(questions);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            (0, _utils.handleError)(_context.t0, res);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

app.post('/', _middlewares.required, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, title, description, icon, q, savedQuestion;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, title = _req$body.title, description = _req$body.description, icon = _req$body.icon;
            q = {
              title: title,
              description: description,
              icon: icon,
              user: req.user._id
            };
            _context2.next = 5;
            return _dbApi.question.create(q);

          case 5:
            savedQuestion = _context2.sent;


            res.status(201).json(savedQuestion);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](0);

            (0, _utils.handleError)(_context2.t0, res);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 9]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

app.get('/:id', _middlewares.questionMiddleware, function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var q;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _dbApi.question.findById(req.question);

          case 3:
            q = _context3.sent;

            res.status(200).json(q);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);

            (0, _utils.handleError)(_context3.t0, res);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

app.post('/:id/answers', _middlewares.required, _middlewares.questionMiddleware, function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var a, q, savedAnswer;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            a = req.body;
            q = req.question;

            a.createdAt = +new Date();
            a.user = new _models.User(req.user);

            _context4.next = 7;
            return _dbApi.question.createAnswer(q, a);

          case 7:
            savedAnswer = _context4.sent;


            res.status(201).json(savedAnswer);
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](0);

            (0, _utils.handleError)(_context4.t0, res);

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 11]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

exports.default = app;