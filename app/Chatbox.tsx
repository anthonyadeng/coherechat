'use client';

import React, { useEffect, useRef, useState } from 'react';
import { chat } from './api/cohere/cohereClient';
import { ChatMessage } from 'cohere-ai/api';

export default function Chatbox() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(1);
  const messages = useRef([] as React.ReactNode[]);
  useEffect(() => {
    const latest = chatHistory[chatHistory.length - 1] || {
      role: '',
      message: '',
    };
    const newChatDiv = document.createElement('div');
    if (latest.role === 'USER') {
      newChatDiv.innerHTML = latest.message;
      newChatDiv.classList.add('bg-slate-600', 'text-white');
    } else {
      fetch('/api/cohere', {
        method: 'POST',
        body: JSON.stringify({ message, chatHistory }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage(data);
        });
      newChatDiv.innerHTML = message;
      newChatDiv.classList.add('bg-gray-900', 'text-white');
    }

    document.getElementById('chat')?.appendChild(newChatDiv);
  }, [chatHistory]);

  return (
    <div>
      <h1>Chatbox.tsx</h1>
      <input type='text' id='chatbox' />

      <button
        id='send'
        onClick={() => {
          const messageInput = document.getElementById(
            'chatbox'
          ) as HTMLInputElement;
          setMessage(messageInput.value);
          setChatHistory([
            ...chatHistory,
            { role: 'USER', message: messageInput.value },
          ]);
        }}
      >
        Send
      </button>
      <div id='chat' style={{ maxHeight: '300px', overflowY: 'auto' }}></div>
    </div>
  );
}

export const MessageBox = (message: string, role: string): React.ReactNode => {
  return role === 'USER' ? (
    <div className='bg-slate-600 text-white'>
      <p>{message}</p>
    </div>
  ) : (
    <div className='bg-gray-900 text-white'>
      <p>{message}</p>
    </div>
  );
};
