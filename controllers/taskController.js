const taskService = require('../services/taskService')

const DEFAULT_NUMBER_OF_TASKS = 3
const NUMBER_OF_TASKS_MUST_BE_POSITIVE_ERROR = 'The number of tasks must be a positive integer'

/**
 * @class TaskController
 */
class TaskController {
  constructor (service) {
    this.taskService = service
  }

  /**
   * Find all the pending tasks and select specific attributes
   *
   * [ _id, title, isDone ]
   *
   * @async
   * @param {Object} req - Request object
   * @return {Promise} List of pending tasks
   */
  async findAllPending (req) {
    const params = req.params

    const numberOfTasks = this._getNumberOfTasks(params.numberOfTasks)
    const tasks = await this.taskService.find(
      {
        isDone: false
      },
      {
        _id: true,
        title: true,
        isDone: true
      },
      numberOfTasks)

    return { result: tasks }
  }

  /**
   * Generate and return tasks
   *
   * [ _id, title, isDone ]
   *
   * @async
   * @param {Object} req - Request object
   * @return {Promise} List of tasks
   */
  async generateTasks (req) {
    const params = req.params

    const numberOfTasks = this._getNumberOfTasks(params.numberOfTasks)
    const tasks = await this.taskService.generateTasks(numberOfTasks)

    return { result: tasks }
  }

  /**
   * Mark the task as done
   *
   * @async
   * @param {Object} req - Request object
   * @param {object} res - Response object
   * @return {Promise} - boolean true if the task was marked as done
   */
  async markAsDone (req, res) {
    const params = req.body
    const taskId = params._id

    const result = this.taskService.markAsDone(taskId)

    return { result }
  }

  /**
   * Mark the task as done
   *
   * @async
   * @param {Object} req - Request object
   * @return {Promise} - boolean true if the task was marked as done
   */
  async enhancedMarkAsDone (req) {
    const params = req.body
    const taskId = params._id

    const result = await this.taskService.enhancedMarkAsDone(taskId)

    return { result }
  }

  /**
   * Create a new task
   *
   * @async
   * @param {Object} req - Request object - must include req.body.title
   * @return {Promise} - boolean true if the task was marked as done
   */
  async create (req) {
    const params = req.body
    const taskTitle = params.title

    const result = await this.taskService.create({ title: taskTitle })

    return { result }
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

module.exports = new TaskController(taskService)
