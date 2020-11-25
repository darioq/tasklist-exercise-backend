/**
 * @module InitializerService
 */

const taskService = require('./taskService')

/**
 * Create the default tasks
 *
 * @async
 * @function createTasks
 * @returns {Promise<void>}
 * @private
 */
async function _createTasks () {
  const taskCollectionIsEmpty = await taskService.isEmpty()
  if (taskCollectionIsEmpty) {
    const data = require('../json/initializeData/tasks')

    for (const taskData of data.items) {
      const task = await taskService.create(taskData)
      console.log(`Task created: ${task.title}`)
    }
  }
}

/**
 * Initialize the entities masters
 *
 * @async
 * @function initMasterEntities
 * @returns {Promise<*>}
 */
async function init () {
  await _createTasks()
}

module.exports = {
  init
}
