/**
 * @module responseService
 */

const HttpStatus = require('http-status-codes')

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
  respond,
  respondOk,
  respondError
}
