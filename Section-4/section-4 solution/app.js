const express = require('express');

const app = express()

// DB
require('./setup/db')();
// APP Utiles
require('./setup/appUtils')(app);
// Routes
require('./setup/routes')(app);


// Handle uncaught exceptions
process.on('uncaughtException', (ex) =>{
  console.log('uncaughtException', ex);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (ex) => {
  console.log('unhandledRejection', ex);
});

// start app
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening at port ${port}...`));