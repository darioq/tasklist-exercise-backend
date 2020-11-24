const router = require('express-promise-router')()
const taskController = require('../controllers/taskController')

router.get('/tasks/:numberOfTasks?', (req, res, next) => {
    return taskController.findAllPending(req, res)
})

router.put('/tasks', (req, res, next) => {
    return taskController.enhancedMarkAsDone(req, res)
})

router.post('/tasks', (req, res, next) => {
    return taskController.create(req, res)
})

module.exports = router
