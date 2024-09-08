import useWebSocket from 'react-use-websocket';
import { useState, useEffect } from 'react';

const socketUrl = 'https://www.ndbc.noaa.gov/data/realtime2/41053.spec'; // Replace with the actual WebSocket URL if applicable

export const WSClient= () => {
  const [messages, setMessages] = useState<string[]>([]);  // Explicitly define the state type

  const { lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log('WebSocket connection opened'),
    onMessage: (message) => {
      if (message && typeof message.data === 'string') {
        setMessages(prev => [...prev, message.data]);  // Correct typing for string data
      }
    },
    shouldReconnect: () => true, // Reconnect on close
  });

  // Effect to handle new messages
  useEffect(() => {
    if (lastMessage !== null) {
      console.log('Received message:', lastMessage);
    }
  }, [lastMessage]);

  return (
    <div>
      <h1>NOAA Real-Time Feed</h1>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}