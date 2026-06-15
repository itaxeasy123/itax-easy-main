"use client";

import { useState } from "react";

const useChatAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message, history = []) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Unable to get chatbot response.");
      }

      return data?.reply || "Sorry, I couldn't generate a response right now.";
    } catch (err) {
      const fallbackMessage =
        "Sorry, I couldn't process that request right now. Please try again in a moment.";
      setError(err.message || fallbackMessage);
      return fallbackMessage;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    loading,
    error,
  };
};

export default useChatAPI;
