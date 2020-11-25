const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const indexRouter = require('./routes/indexRoute')
const enhancedRoute = require('./routes/enhancedRoute')

require('dotenv').config()

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

let indexRouterToUse = indexRouter
const useDatabase = process.env.TASKLIST_USE_DATABASE === '1'

if (useDatabase) {
  indexRouterToUse = enhancedRoute
  // Initialize database
  const promise = new Promise((resolve) => {
    const databaseService = require('./services/databaseService')
    databaseService.connect().then(() => {
      resolve()
    })
  })
  promise
    .then(() => {
      // Initialize entities
      const { init } = require('./services/initializerService')
      return init()
    })
}

// Initialize routes
app.use('/', indexRouterToUse)

// 404 - Request that doesn't exist
app.use((req, res, next) => {
  console.error('404 - Not Found')
  res.status(404).json({ error: 'Not Found' })
})

// 505 - Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({error: err.message}) // Respond generic error
})

module.exports = app
