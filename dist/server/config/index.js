'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var secret = process.env.secret || 'miclavesecreta';
var PORT = process.env.PORT || 3000;
var username = 'hernan';
var password = 'f0dd46e75d0577e596f7eeb40673dd2e';

var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/platzi-overflow';

exports.secret = secret;
exports.mongoUrl = mongoUrl;
exports.PORT = PORT;