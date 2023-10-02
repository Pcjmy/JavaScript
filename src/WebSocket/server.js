const net = require('net');
const crypto = require('crypto');

const server = net.createServer((socket) => {
  console.log('connected');

  socket.on('data', (buffer) => {
    console.log('data');
    const headers = parseHttpHeaders(buffer);
    let first = true;
    if (first) {
      if (headers.upgrade !== 'websocket') {
        socket.end();
      } else if (headers['sec-websocket-version'] !== '13') {
        socket.end();
      } else {
        // 258EAFA5-E914-47DA-95CA-C5AB0DC85B11
        // accept = sha1(key+mask).base64()
        let key = headers['sec-websocket-key'];
        const mask = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
        let hash = crypto.createHash('sha1');
        hash.update(key + mask);
        let accept = hash.digest('base64');
        socket.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${accept}\r\n\r\n`);
      }
      first = false;
    }

    console.log(headers);
  });

  socket.on('end', () => {
    console.log('closed');
  });
});

server.listen(8080);

function parseHttpHeaders(buffer) {
  const str = buffer.toString();
  let arr = str.split('\r\n');
  arr.shift();
  arr = arr.filter(str => str);
  let headers = {};
  arr.forEach(str => {
    let [key,value] = str.split(':');
    key=key.trim().toLowerCase();
    value=value.trim();
    headers[key]=value;
  })
  return headers;
}
