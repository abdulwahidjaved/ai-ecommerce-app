'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@/context/ChatContext';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

// ChatContainer component to display messages
export default function ChatContainer() {
  const { messages, isTyping, removeMessage } = useChat();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to AI Assistant</h2>
          <p className="text-gray-600 mb-6">
            Ask me anything about our products, services, or get help with your orders. I'm here to help!
          </p>

          {/* Quick Start Examples */}
          <div className="space-y-2 mb-6">
            <p className="text-xs text-gray-500 font-semibold mb-3">Try asking:</p>
            <div className="space-y-2">
              <button
                disabled
                className="w-full text-left px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg hover:bg-blue-100 transition"
              >
                "How do I track my order?"
              </button>
              <button
                disabled
                className="w-full text-left px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg hover:bg-blue-100 transition"
              >
                "What's your return policy?"
              </button>
              <button
                disabled
                className="w-full text-left px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg hover:bg-blue-100 transition"
              >
                "Can you recommend a product?"
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Start typing below to begin your conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-white p-4 md:p-6 space-y-4"
    >
      {/* Messages */}
      {messages.map((message) => (
        <div key={message.id} className="group">
          <ChatMessage
            message={message}
            onRemove={message.sender === 'user' ? removeMessage : undefined}
          />
        </div>
      ))}

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator />}

      {/* Scroll Anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
}
