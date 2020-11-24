const taskService = require('../services/taskService')
const responseService = require('../services/responseService')

const DEFAULT_NUMBER_OF_TASKS = 3

const NUMBER_OF_TASKS_MUST_BE_POSITIVE_ERROR = 'The number of tasks must be a positive integer'

/**
 * @class TaskController
 * @extends AbstractController
 */
class TaskController {
  /**
   * Find all the pending tasks and select specific attributes
   *
   * [ _id, title, isDone ]
   *
   * @async
   * @param {Object} req - Request object
   * @param {object} res - Response object
   * @return {Promise} List of pending tasks
   */
  async findAllPending (req, res) {
    const params = req.params

    try {
      const numberOfTasks = this._getNumberOfTasks(params.numberOfTasks)
      const tasks = await taskService.find(
        {
          isDone: false
        },
        {
          _id: true,
          title: true,
          isDone: true
        },
        numberOfTasks)

      responseService.respondOk(res, { result: tasks })
    } catch (error) {
      console.error(error.message)
      responseService.respondError(res, { error: error.message })
    }
  }

  /**
   * Generate and return tasks
   *
   * [ _id, title, isDone ]
   *
   * @async
   * @param {Object} req - Request object
   * @param {object} res - Response object
   * @return {Promise} List of tasks
   */
  async generateTasks (req, res) {
    const params = req.params

    try {
      const numberOfTasks = this._getNumberOfTasks(params.numberOfTasks)
      const tasks = await taskService.generateTasks(numberOfTasks)
      responseService.respondOk(res, { result: tasks })
    } catch (error) {
      console.error(error.message)
      responseService.respondError(res, { error: error.message })
    }
  }

  /**
   * Mark the task as done
   *
   *
   * @async
   * @param {Object} req - Request object
   * @param {object} res - Response object
   * @return {Promise} - boolean true if the task was marked as done
   */
  async markAsDone (req, res) {
    const params = req.body
    const taskId = params._id

    try {
      const result = taskService.markAsDone(taskId)
      responseService.respondOk(res, { result })
    } catch (error) {
      console.error(error.message)
      responseService.respondError(res, { error: error.message })
    }
  }

  /**
   * Mark the task as done
   *
   *
   * @async
   * @param {Object} req - Request object
   * @param {object} res - Response object
   * @return {Promise} - boolean true if the task was marked as done
   */
  async enhancedMarkAsDone (req, res) {
    const params = req.body
    const taskId = params._id

    try {
      const result = await taskService.enhancedMarkAsDone(taskId)
      responseService.respondOk(res, { result })
    } catch (error) {
      console.error(error.message)
      responseService.respondError(res, { error: error.message })
    }
  }

  /**
   * Create a new task
   *
   *
   * @async
   * @param {Object} req - Request object - must include req.body.title
   * @param {object} res - Response object
   * @return {Promise} - boolean true if the task was marked as done
   */
  async create (req, res) {
    const params = req.body
    const taskTitle = params.title

    try {
      const result = await taskService.create(taskTitle)
      responseService.respondOk(res, { result })
    } catch (error) {
      console.error(error.message)
      responseService.respondError(res, { error: error.message })
    }
  }

  /**
   * Get the numbers of tasks
   *
   * @async
   * @function _getNumberOfTasks
   * @returns {Number}
   * @private
   */
  _getNumberOfTasks (numberOfTasksString) {
    if (numberOfTasksString == null) {
      return DEFAULT_NUMBER_OF_TASKS
    } else {
      const numberOfTasks = Number(numberOfTasksString)

      if (Number.isInteger(numberOfTasks) && numberOfTasks > 0) {
        return numberOfTasks
      }
    }

    throw new Error(NUMBER_OF_TASKS_MUST_BE_POSITIVE_ERROR)
  }
}

module.exports = new TaskController()
