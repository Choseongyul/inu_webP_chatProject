'use strict';

/**
 * Module dependencies.
 */
const express = require('express');
const http = require('http');

// Assuming './routes/socket.js' exports a function that handles socket events
const socketHandler = require('./routes/socket.js');

const app = express();
const server = http.createServer(app);

/* Configuration */
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);


/* Error Handling */
// Using a third-party error handling middleware recommended for express
if (process.env.NODE_ENV === 'development') {
    const errorHandler = require('errorhandler');
    app.use(errorHandler());
}

/* Socket.io Communication */
const { Server } = require('socket.io');
const io = new Server(server);
io.on('connection', socketHandler);  // Use the imported function for socket events

/* Start server */
server.listen(app.get(3000), () => {
  console.log(`Express server listening on port ${app.get('port')} in ${app.get('env') || 'default'} mode`);
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = app;
