const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Server</title>
    </head>
    <body style="background-color: #3b82f6; color: white; font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
      <div style="text-align: center;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Test Server Working!</h1>
        <p style="font-size: 1.2rem;">If you can see this, the network connection is working.</p>
      </div>
    </body>
    </html>
  `);
});

server.listen(3002, '0.0.0.0', () => {
  console.log('Test server running on http://localhost:3002');
}); 