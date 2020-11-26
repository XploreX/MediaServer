const {networkInterfaces} = require('os');
const nets = networkInterfaces();

/**
 * @param {express-app} app the express app to start on all interfaces
 * @param {string} port the port to start the app on
 * @return {Http.server} the server instance
 */
function startServer(app, port) {
  const server = app.listen(port, () => {
    console.log('server is up');
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
          console.log('listening at http://' + net.address + ':' + port);
        }
      }
    }
  });
  return server;
}
module.exports = startServer;
