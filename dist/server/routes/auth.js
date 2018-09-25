'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./../config');

var _models = require('./../models');

var _bcryptjs = require('bcryptjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = _express2.default.Router();
var debug = new _debug2.default('platzi-overflow:auth');

var comparePasswords = function comparePasswords(providedPassword, userPassword) {
  return (0, _bcryptjs.compareSync)(providedPassword, userPassword);
};

var handleFailed = function handleFailed(res, error, message) {
  return res.status(401).json({
    message: message,
    error: error
  });
};

var createdToken = function createdToken(user) {
  return _jsonwebtoken2.default.sign({ user: user }, _config.secret, { expiresIn: 86400 });
};

app.post('/signin', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, user, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 4;
            return _models.User.findOne({ email: email });

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            debug('User with email ' + email + ' not found');
            return _context.abrupt('return', handleFailed(res, error));

          case 8:
            if (comparePasswords(password, user.password)) {
              _context.next = 11;
              break;
            }

            debug('Passwords do not maych: ' + password + ' !== ' + user.password);
            return _context.abrupt('return', handleFailed(res, error, 'El correo y la contraseña no coinciden'));

          case 11:
            token = createdToken(user);


            res.status(200).json({
              message: 'Login succeded',
              token: token,
              user_id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            });
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);

            handleFailed(res, _context.t0, 'Login failed');

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

app.post('/signup', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, firstName, lastName, email, password, u, user, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, password = _req$body2.password;
            u = new _models.User({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: (0, _bcryptjs.hashSync)(password, 10)
            });


            debug('Creating new user: ' + u);

            _context2.next = 6;
            return u.save();

          case 6:
            user = _context2.sent;
            token = createdToken(user);


            res.status(201).json({
              message: 'User saved',
              token: token,
              userId: user.id,
              firstName: firstName,
              lastName: lastName,
              email: email
            });
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](0);

            handleFailed(res, _context2.t0, 'Register failed');

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 11]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = app;