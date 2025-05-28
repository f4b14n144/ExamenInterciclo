const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  
  // Mensaje se envia cada 3 segundos 
  const interval = setInterval(() => {
    const data = {
      time: new Date().toLocaleTimeString(),
      message: 'Mensaje del servidor WebSocket'
    };
    ws.send(JSON.stringify(data));
  }, 3000);

  ws.on('close', () => {
    console.log('Cliente desconectado');
    clearInterval(interval);
  });
});

console.log('Servidor WebSocket ejecutándose en ws://localhost:8080');