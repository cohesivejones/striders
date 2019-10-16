const mongoose = require('mongoose');

// set up mongoose connection
const mongoDB = process.env.DB
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
