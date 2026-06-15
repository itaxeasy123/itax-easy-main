import React from 'react';

const MessageItem = ({ message }) => {
  const { text, sender } = message;

  return (
    <div className={`message-item ${sender}`}>
      <div className="message-content" style={{ whiteSpace: 'pre-wrap' }}>
        {text}
      </div>
    </div>
  );
};

export default MessageItem;
