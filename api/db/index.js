const mongoose = require('mongoose')
const { urlDb } = require('../app/config')

mongoose.connect(urlDb)

const db = mongoose.connection

module.exports = db;