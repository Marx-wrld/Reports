const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Mock data function
const generateMockData = (startDate, endDate) => {
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  return {
    routes: [
      {
        route_id: 1,
        route_name: 'Route A',
        statistics: {
          files_processed: randomInt(100, 500),
          error_files: randomInt(10, 50),
          sent_emails: randomInt(200, 300),
        },
      },
      {
        route_id: 2,
        route_name: 'Route B',
        statistics: {
          files_processed: randomInt(150, 600),
          error_files: randomInt(20, 60),
          sent_emails: randomInt(250, 350),
        },
      },
      {
        route_id: 3,
        route_name: 'Route C',
        statistics: {
          files_processed: randomInt(200, 700),
          error_files: randomInt(30, 70),
          sent_emails: randomInt(300, 400),
        },
      },
    ],
  };
};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'fetchReports') {
      const { startDate, endDate } = data.payload;
      const reportData = generateMockData(startDate, endDate);
      ws.send(JSON.stringify({ type: 'reportData', payload: reportData }));
    }
  });

  ws.send(JSON.stringify({ type: 'connection', message: 'Connected to WebSocket server' }));
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
