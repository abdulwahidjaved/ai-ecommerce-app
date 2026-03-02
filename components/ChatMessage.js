'use client';

import { useState } from 'react';

// ChatMessage component to display individual messages
export default function ChatMessage({ message, onRemove }) {
  const [copied, setCopied] = useState(false);

  const isUserMessage = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className={`flex gap-3 mb-4 animate-fadeIn ${isUserMessage ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
          isUserMessage
            ? 'bg-blue-600 text-white'
            : message.isError
            ? 'bg-red-100 text-red-600'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        {isUserMessage ? 'U' : message.isError ? '⚠' : 'AI'}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col gap-2 max-w-2xl ${isUserMessage ? 'items-end' : 'items-start'}`}>
        {/* Timestamp */}
        <span className="text-xs text-gray-500">
          {formatTime(message.timestamp)}
        </span>

        {/* Message Bubble */}
        <div
          className={`px-4 py-3 rounded-lg break-words ${
            isUserMessage
              ? 'bg-blue-600 text-white rounded-br-none'
              : message.isError
              ? 'bg-red-50 text-red-800 border border-red-200 rounded-bl-none'
              : 'bg-gray-100 text-gray-900 rounded-bl-none'
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.text}
          </p>
        </div>

        {/* Actions */}
        {!isUserMessage && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              title="Copy message"
              className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            {onRemove && (
              <button
                onClick={() => onRemove(message.id)}
                title="Remove message"
                className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-red-300 text-gray-700 transition"
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>

      {/* Wrapper for hover effects */}
      <div className="group" />
    </div>
  );
}
