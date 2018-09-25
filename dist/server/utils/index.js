'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var handleError = function handleError(error, res) {
  res.status(500).json({
    message: 'An error ocurred',
    error: error
  });
};

exports.handleError = handleError;