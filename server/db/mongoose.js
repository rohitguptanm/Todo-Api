const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {
    // auth: {
    //   user: '<cosmosdb-username>',
    //   password: '<cosmosdb-password>'
    // }
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

module.exports = { mongoose };