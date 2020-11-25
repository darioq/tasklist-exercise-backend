const express = require('express')
const router = express.Router()
const { errorHandling, respondOk } = require('../utils/responseHandler')
const taskController = require('../controllers/taskController')

router.get('/tasks/:numberOfTasks?',
  errorHandling(async (req, res) => {
    const responseData = await taskController.findAllPending(req)
    return respondOk(res, responseData)
  })
)

router.put('/tasks',
  errorHandling(async (req, res) => {
    const responseData = await taskController.enhancedMarkAsDone(req)
    return respondOk(res, responseData)
  })
)

router.post('/tasks',
  errorHandling(async (req, res) => {
    const responseData = await taskController.create(req)
    return respondOk(res, responseData)
  })
)

module.exports = router
