const HttpStatus = require('http-status-codes');
const { RESPONSE_DATA_TYPE } = require('./constant');

const env = process.env.NODE_ENV;

const defaultErrorHandle = (err, res, next) => {
  if (env === 'development') {
    // do something for tracking errors in development mode
    next(err);
  } else {
    next(err);
  }
};

const sendSuccessfulResult = (res, data, okStatus, responseType) => {
  if (responseType === RESPONSE_DATA_TYPE.BINARY) {
    // simply return the data
    res.end(data);
  } else if (responseType === RESPONSE_DATA_TYPE.JSON) {
    res.status(okStatus || HttpStatus.OK).send({ data });
  } else {
    res.status(500).send('Error! Invalid response data type.');
  }
};

module.exports.genericHandle = (req, res, next, handler, okStatus, postHandler, responseType) => (
  handler(req).then((data) => {
    // preserve a post callback 
    if (postHandler) postHandler(data, res);
    // return the success response
    sendSuccessfulResult(res, data, okStatus, responseType || RESPONSE_DATA_TYPE.JSON);
  }).catch((err) => {
    // handler error
    defaultErrorHandle(err, res, next);
  })
);
