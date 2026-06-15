"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatIcon from "./components/ChatIcon";
import ChatWindow from "./components/ChatWindow";
import useChatAPI from "./hooks/useChatAPI";
import "./styles/chatbot.css";

const WELCOME_MESSAGE = {
  id: "welcome-message",
  text: "Hi there! Need help or have a question? Just ask — I'm here for you.",
  sender: "bot",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const chatRef = useRef(null);
  const { sendMessage, loading } = useChatAPI();

  const toggleChat = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) {
        setIsExpanded(false);
      }
      return next;
    });
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleSendMessage = async (message) => {
    const trimmedMessage = typeof message === "string" ? message.trim() : "";
    if (!trimmedMessage) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      text: trimmedMessage,
      sender: "user",
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);

    const response = await sendMessage(trimmedMessage, nextMessages);

    const botMessage = {
      id: `bot-${Date.now()}`,
      text: response,
      sender: "bot",
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`chatbot-container ${isExpanded ? "expanded" : ""}`} ref={chatRef}>
      {isOpen && (
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          onClose={toggleChat}
          isLoading={loading}
          isExpanded={isExpanded}
          onToggleExpand={toggleExpand}
        />
      )}
      {!isExpanded && <ChatIcon onClick={toggleChat} isOpen={isOpen} />}
    </div>
  );
};

export default Chatbot;
