'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { Input } from '../ui/input';
import useSendMessage from '@/hooks/useSendMessage';

function MessageInput() {
  const [newMessage, setNewMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();
  const handleSendMessage = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await sendMessage(newMessage);
    setNewMessage('');
  };
  return (
    <div className="w-full relative flex justify-between items-center px-2 z-10">
      <Input
        type="text"
        id="message"
        name="message"
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
        }}
      />
      <Button onClick={handleSendMessage} disabled={loading}>
        <Send />
      </Button>
    </div>
  );
}

export default MessageInput;
