'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserByEmail = exports.required = undefined;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _config = require('./../config');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default('platzi-overflow:auth-middleware');

var findUserByEmail = function findUserByEmail(emailSought) {
  return users.find(function (_ref) {
    var email = _ref.email;
    return email === emailSought;
  });
};

var required = function required(req, res, next) {
  _jsonwebtoken2.default.verify(req.headers.token, _config.secret, function (error, token) {
    if (error) {
      debug('JWT was not enctrypted with our secret');
      return res.status(401).json({
        message: 'Unauthorized',
        error: error
      });
    }

    debug('Token verified ' + token);
    req.user = token.user;
    next();
  });
};

exports.required = required;
exports.findUserByEmail = findUserByEmail;