'use client';

import { useState, useRef, useEffect } from 'react';

// MessageInput component for composing messages
export default function MessageInput({ onSendMessage, isLoading, disabled }) {
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef(null);
  const MAX_CHARS = 2000;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setMessage(text);
      setCharCount(text.length);
    }
  };

  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message);
      setMessage('');
      setCharCount(0);
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    // Send on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
    // Allow Enter with Shift for new line
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = isLoading || disabled || !message.trim();
  const charPercentage = (charCount / MAX_CHARS) * 100;
  const isNearLimit = charPercentage > 80;

  return (
    <div className="bg-white border-t border-gray-200 p-4 space-y-2">
      {/* Message Input Area */}
      <div className="relative flex gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything... (Ctrl+Enter to send)"
          disabled={isLoading || disabled}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-30 disabled:bg-gray-100 disabled:cursor-not-allowed"
          rows="1"
        />

        <button
          onClick={handleSend}
          disabled={isDisabled}
          aria-label="Send message"
          title="Send (Ctrl+Enter)"
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-150 self-end flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⏳</span>
              <span className="hidden sm:inline">Sending</span>
            </>
          ) : (
            <>
              <span>↑</span>
              <span className="hidden sm:inline">Send</span>
            </>
          )}
        </button>
      </div>

      {/* Character Counter and Help Text */}
      <div className="flex items-center justify-between text-xs">
        <p className="text-gray-600">
          {message.trim().length > 0
            ? `${charCount} / ${MAX_CHARS} characters`
            : 'Shift+Enter for new line'}
        </p>

        {/* Character Limit Progress Bar */}
        {charCount > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  isNearLimit ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${charPercentage}%` }}
              />
            </div>
            <span className={isNearLimit ? 'text-red-600 font-semibold' : 'text-gray-600'}>
              {MAX_CHARS - charCount}
            </span>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
        💡 Tips: Use <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Ctrl</kbd>+<kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> to send,
        <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Shift</kbd>+<kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> for new line
      </div>
    </div>
  );
}
