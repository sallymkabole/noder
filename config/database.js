//setup dab connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/restApi';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;