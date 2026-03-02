'use client';

// TypingIndicator component to show AI is typing
export default function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4 animate-fadeIn">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-gray-200 text-gray-700">
        AI
      </div>

      {/* Typing Indicator */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-100 text-gray-900 rounded-bl-none">
        <span className="inline-flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: '0.2s' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
            style={{ animationDelay: '0.4s' }}
          />
        </span>
        <span className="text-xs text-gray-600 ml-2">AI is typing...</span>
      </div>
    </div>
  );
}
