const hipsumService = require('./hipsumService')
const { generateUUID } = require('../utils/utils')
const Task = require('../models/task')

const TASK_HAS_BEEN_MARKED_AS_DONE_RESULT = (taskId) => `Task ${taskId} has been marked as done`
const TASK_DOES_NOT_EXIST_ERROR = (taskId) => `Task ${taskId} does not exist`
const TASK_CANNOT_BE_NULL_ERROR = 'TaskId cannot be null'

/**
 * @class TaskService
 */
class TaskService {
  constructor () {
    this.entityClass = Task
  }

  /**
   * Method to create a task.
   *
   * @async
   * @param {Object} data - Data object task
   * @returns {Promise<data>} - The created task
   */
  async create (data) {
    return this.entityClass.create(data)
  }

  /**
   * Find items by params
   *
   * @async
   * @param {Object} filter
   * @param {Object} select - Attribute to select
   * @param {Number?} numberOfTasks
   */
  async find (filter = {}, select = null, numberOfTasks = null) {
    return this.entityClass
      .find(filter)
      .select(select)
      .limit(numberOfTasks)
      .exec()
  }

  /**
   *
   * @async
   * @param {string} _id
   * @param {Object} updateData - updateDate object
   * @returns {Promise<*>}
   */
  async update (_id, updateData) {
    return this.entityClass.updateOne(
      { _id },
      { $set: updateData }
    )
  }

  /**
   * Checks if the collection is empty
   *
   * @async
   * @returns {Promise<Boolean>} - True if it is empty
   */
  async isEmpty () {
    const count = await this.entityClass.countDocuments()
    return count === 0
  }

  /**
   * Generate and return tasks
   *
   * [ _id, title, isDone ]
   *
   * @async
   * @param {Number} numberOfTasks - tasks to generate
   * @return {Promise} List of tasks
   */
  async generateTasks (numberOfTasks) {
    const taskTitles = await hipsumService.getSentences(numberOfTasks)
    const result = []

    for (const taskTitle of taskTitles) {
      result.push({ _id: generateUUID(), title: taskTitle.trim(), isDone: false })
    }

    return result
  }

  /**
   * Mask the task as done
   *
   *
   * @param {string} taskId - the id of the task to be marked as done
   * @return {boolean} - true
   */
  markAsDone (taskId) {
    if (taskId) {
      const message = TASK_HAS_BEEN_MARKED_AS_DONE_RESULT(taskId)
      console.log(message)

      return true
    }

    throw new Error(TASK_CANNOT_BE_NULL_ERROR)
  }

  /**
   * Mask the task as done
   *
   *
   * @param {string} taskId - the id of the task to be marked as done
   * @return {boolean} - true
   */
  async enhancedMarkAsDone (taskId) {
    const result = await this.update(taskId, { isDone: true })

    if (result.nModified === 1) {
      return this.markAsDone(taskId)
    }

    throw new Error(TASK_DOES_NOT_EXIST_ERROR(taskId))
  }
}

module.exports = new TaskService()
