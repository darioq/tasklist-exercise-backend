const express = require('express')
const router = express.Router()
const { errorHandling, respondOk } = require('../utils/responseHandler')
const taskController = require('../controllers/taskController')

router.get('/tasks/:numberOfTasks?',
  errorHandling(async (req, res) => {
    const responseData = await taskController.generateTasks(req)
    return respondOk(res, responseData)
  })
)

router.put('/tasks',
  errorHandling(async (req, res) => {
    const responseData = await taskController.markAsDone(req)
    return respondOk(res, responseData)
  })
)

module.exports = router
