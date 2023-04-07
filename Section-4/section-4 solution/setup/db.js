require('dotenv').config();
const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db');


module.exports = function () {
    // db connection
    mongoose.set('strictQuery', true);
    module.exports = mongoose.connect(process.env.DB_HOST)
        .then(() =>dbDebugger('Connected to db...'))
        .catch(err => dbDebugger('Error: ', err));
}