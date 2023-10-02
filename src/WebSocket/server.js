const net = require('net');

const server = net.createServer((socket) => {
  console.log('connected');

  socket.on('data', (buffer) => {
    console.log('data');
    console.log(buffer);
    console.log(buffer.toString());
  });

  socket.on('end', () => {
    console.log('closed');
  });
});

server.listen(8080);
