const axios = require('axios')

const SENTENCE_SEPARATOR = '.'
const HIPSUM_API_TYPE = 'hipster-centric'
const HIPSUM_API_URL = (sentences) => `https://hipsum.co/api/?type=${HIPSUM_API_TYPE}&sentences=${sentences}`

/**
 * Consume hipsum API and return the sentences as an array
 *
 * @async
 * @param {Number} sentences - number of and sentences to generate
 * @return {Promise} Array of string sentences
 */
async function getSentences (sentences) {
  const response = await axios.get(HIPSUM_API_URL(sentences))
  return response.data[0].split(SENTENCE_SEPARATOR, sentences)
}

module.exports = {
  getSentences
}
