const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

let targetNumbers = [];

let webSocketConnection = null;

app.post('/set-numbers', (req, res) => {
  const { numbers } = req.body;
  targetNumbers = numbers;

  if (webSocketConnection) {
    webSocketConnection.send(JSON.stringify({ message: 'Reset' }));
  }

  res.status(200).json({ message: 'Target number set successfully!' });
});

app.get('/get-result', (req, res) => {
  res.json({ result: targetNumbers });
});

// WebSocket server logic
wss.on('connection', (ws) => {
  webSocketConnection = ws;
  console.log('New client connected');

  // Send a welcome message to the client
  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Here you can handle incoming messages, for example, broadcast to other clients
    ws.send(`Server received: ${message}`);
  });

  // Handle client disconnecting
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

const HTTP_PORT = 5000;
app.listen(HTTP_PORT, () => {
  console.log(`HTTP Server is running on HTTP_PORT ${HTTP_PORT}`);
});

// Start the HTTP and WebSocket server
const WS_PORT = 8080;
server.listen(WS_PORT, () => {
  console.log(`WebSocket server is running on http://localhost:${WS_PORT}`);
});