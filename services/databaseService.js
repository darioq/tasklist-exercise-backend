const mongoose = require('mongoose')

/**
 * @class Database
 */
class Database {
  constructor () {
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
    mongoose.set('useUnifiedTopology', true)
  }

  /**
   * @async
   * @returns {Promise<void>}
   */
  async connect () {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.TASKLIST_DATABASE_URL}/${process.env.TASKLIST_DATABASE_NAME}${process.env.TASKLIST_DATABASE_PARAMETERS}`,
        {
          useNewUrlParser: true
        }
      )
      console.info('MONGODB | Connection successful')
    } catch (err) {
      console.error(err.reason)
    }
  }
}

module.exports = new Database()
