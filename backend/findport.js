const net = require('net');

function findAvailablePort(startPort, endPort, callback) {
  const portRange = Array.from({ length: endPort - startPort + 1 }, (_, index) => startPort + index);
  
  const findPort = (index) => {
    if (index >= portRange.length) {
      // No available ports in the specified range
      callback(null);
      return;
    }
    
    const port = portRange[index];
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Port is in use, try the next one
        findPort(index + 1);
      } else {
        // Other error occurred, return the error
        callback(err);
      }
    });
    
    server.once('listening', () => {
      // Port is available, close the server and return the port
      server.close(() => {
        callback(null, port);
      });
    });
    
    server.listen(port, '127.0.0.1');
  };
  
  findPort(0);
}

// Example usage:
findAvailablePort(3000, 4000, (err, port) => {
  if (err) {
    console.error('Error finding available port:', err);
  } else {
    console.log('Available port:', port);
    // Use this port for your application
  }
});