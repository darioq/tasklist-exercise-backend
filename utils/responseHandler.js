const HttpStatus = require('http-status-codes')

/**
 * Given an express routing function, returns a new function
 * that will automatically pass any errors to error handling
 * middleware if the function throws an error or returns
 * a rejected promise
 *
 * @param {Function} fn
 * @return {Function}
 */
const errorHandling = (fn) => (req, res, next) => {
  try {
    const maybePromise = fn(req, res, next)
    if (maybePromise && typeof maybePromise.then === 'function') {
      return maybePromise.catch(err => {
        next(err)
      })
    }
  } catch (err) {
    return next(err)
  }
}

/**
 * Function Respond
 *
 * @function respond
 * @param {Object} res - Res Object
 * @param {Object} statusCode - StatusCode Object
 * @param {Object} data - Data Object
 */
function respond (res, statusCode, data) {
  res.status(statusCode).json(data)
}

/**
 * Function RespondOk
 *
 * @function respondOk
 * @param {Object} res - Res Object
 * @param {Object} data - Data Object
 */
function respondOk (res, data = null) {
  respond(res, HttpStatus.OK, data)
}

/**
 * Function RespondError
 *
 * @function respondError
 * @param {Object} res - Res Object
 * @param {Object} data - Data Object
 */
function respondError (res, data = null) {
  respond(res, HttpStatus.INTERNAL_SERVER_ERROR, data)
}

module.exports = {
  errorHandling,
  respond,
  respondOk,
  respondError
}
