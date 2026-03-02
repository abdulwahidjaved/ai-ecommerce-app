'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create the Chat Context
const ChatContext = createContext();

// ChatProvider component
export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load chat history from localStorage on mount
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('chatHistory');
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        // Keep only last 50 messages for performance
        setMessages(parsed.slice(-50));
      }
    } catch (error) {
      console.error('[v0] Error loading chat history:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isHydrated && messages.length > 0) {
      try {
        // Keep only last 50 messages
        const toSave = messages.slice(-50);
        localStorage.setItem('chatHistory', JSON.stringify(toSave));
      } catch (error) {
        console.error('[v0] Error saving chat history:', error);
      }
    }
  }, [messages, isHydrated]);

  // Send message to AI
  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) {
      setError('Message cannot be empty');
      return;
    }

    if (userMessage.length > 2000) {
      setError('Message is too long (max 2000 characters)');
      return;
    }

    // Add user message to state
    const newUserMessage = {
      id: `msg-${Date.now()}`,
      text: userMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setError(null);
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Call API route to get AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Add AI response to state
      const aiMessage = {
        id: `msg-${Date.now()}`,
        text: data.message,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('[v0] Chat error:', error);
      setError(error.message || 'Failed to get response. Please try again.');
      
      // Add error message to chat
      const errorMessage = {
        id: `msg-${Date.now()}`,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [messages]);

  // Clear chat history
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    localStorage.removeItem('chatHistory');
  }, []);

  // Remove specific message
  const removeMessage = useCallback((messageId) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  }, []);

  const value = {
    messages,
    isLoading,
    error,
    isTyping,
    sendMessage,
    clearChat,
    removeMessage,
  };

  return (
    <ChatContext.Provider value={value}>
      {isHydrated ? children : <></>}
    </ChatContext.Provider>
  );
}

// Hook to use Chat Context
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
