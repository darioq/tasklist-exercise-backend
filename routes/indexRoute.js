const router = require('express-promise-router')()
const taskController = require('../controllers/taskController')

router.get('/tasks/:numberOfTasks?', (req, res, next) => {
    return taskController.generateTasks(req, res)
})

router.put('/tasks', (req, res, next) => {
    return taskController.markAsDone(req, res)
})


module.exports = router
