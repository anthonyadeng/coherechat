import { useState } from 'react';
import { chat } from './cohereClient';

export default async function Chatbox() {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(1);

  return (
    <div>
      <h1>Chat</h1>
      <input type='text' id='chatbox' />
      <button id='send'>Send</button>
      <div id='chat'></div>
      <textarea id='chatHistory' style={{ display: 'none' }}>
        {}
      </textarea>
    </div>
  );
}
