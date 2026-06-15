"use client"
import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form className="chatbot-input flex items-center gap-2 p-2 border-t bg-white" onSubmit={handleSubmit}>
      
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your question..."
        aria-label="Message"
        disabled={isLoading}
        className="
          flex-1
          px-4 py-2
          rounded-full
          border
          outline-none
          text-black
          font-semibold
          text-[15px]
          placeholder:text-gray-400
          bg-white
        "
      />

      <button
        type="submit"
        aria-label="Send"
        disabled={isLoading || !input.trim()}
        className="
          bg-blue-600
          text-white
          p-2
          rounded-full
          hover:bg-blue-700
          disabled:opacity-50
        "
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

    </form>
  );
};

export default ChatInput;