import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import ChatInput from './ChatInput';

const ChatWindow = ({ messages, onSendMessage, onClose, isLoading, isExpanded, onToggleExpand }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`chatbot-window ${isExpanded ? 'expanded' : ''}`}>
      <div className="chatbot-header">
        <h3>Chat Assistant</h3>
        <div className="chatbot-controls">
          <button 
            className={`expand-button ${isExpanded ? 'expanded' : ''}`} 
            onClick={onToggleExpand} 
            aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
          >
            {isExpanded ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" 
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" 
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
      </div>
      
      <div className="chatbot-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Hi there! How can I help you today?</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))
        )}
        {isLoading && (
          <div className="message-item bot">
            <div className="message-content loading">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;
