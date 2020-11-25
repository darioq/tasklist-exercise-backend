const mongoose = require('mongoose')

/**
 * @class Database
 */
class Database {
  constructor (mongoose) {
    this.mongoose = mongoose
    this.mongoose.set('useFindAndModify', false)
    this.mongoose.set('useCreateIndex', true)
    this.mongoose.set('useUnifiedTopology', true)
  }

  /**
   * @async
   * @returns {Promise<void>}
   */
  async connect () {
    try {
      await this.mongoose.connect(
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

module.exports = new Database(mongoose)
