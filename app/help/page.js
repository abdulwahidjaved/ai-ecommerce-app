'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { ChatProvider, useChat } from '@/context/ChatContext';
import ChatContainer from '@/components/ChatContainer';
import MessageInput from '@/components/MessageInput';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Chat Page Content Component
function ChatPageContent() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();

  // Protect route - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to use AI Assistant');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the entire conversation? This action cannot be undone.')) {
      clearChat();
      toast.success('Conversation cleared');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col min-h-screen md:min-h-[calc(100vh-64px)]">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
              <p className="text-sm text-gray-600 mt-1">Get instant help with your questions</p>
            </div>

            {/* Header Actions */}
            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                title="Clear conversation"
                className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                Clear Chat
              </button>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 md:px-6 py-3 flex items-center justify-between gap-4">
              <span className="text-sm font-medium">
                ⚠ {error}
              </span>
              <button
                onClick={() => clearChat()}
                className="text-sm px-3 py-1 bg-red-200 hover:bg-red-300 rounded transition"
              >
                Clear
              </button>
            </div>
          )}

          {/* Chat Container */}
          <ChatContainer />

          {/* Message Input */}
          <MessageInput
            onSendMessage={sendMessage}
            isLoading={isLoading}
            disabled={!isAuthenticated}
          />
        </div>

        {/* Sidebar - Chat Info */}
        <div className="hidden lg:flex lg:w-80 bg-gray-50 border-l border-gray-200 flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900 mb-2">Chat Info</h2>
            <p className="text-xs text-gray-600">
              Messages per session: <span className="font-semibold">{messages.length}</span>
            </p>
          </div>

          {/* Quick Help */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {/* How to Use */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">How to Use</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex gap-2">
                  <span className="text-gray-400 font-bold">1</span>
                  <span>Type your question or request in the input field</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400 font-bold">2</span>
                  <span>Press Enter or click the Send button</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400 font-bold">3</span>
                  <span>Wait for the AI response</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400 font-bold">4</span>
                  <span>Continue the conversation or start a new topic</span>
                </li>
              </ul>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Keyboard Shortcuts</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex justify-between items-center">
                  <span>Send Message</span>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Ctrl+Enter</kbd>
                </li>
                <li className="flex justify-between items-center">
                  <span>New Line</span>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Shift+Enter</kbd>
                </li>
              </ul>
            </div>

            {/* Tips */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Tips</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li>✓ Be specific with your questions</li>
                <li>✓ Ask follow-up questions freely</li>
                <li>✓ Copy helpful responses with the Copy button</li>
                <li>✓ Clear conversation to start fresh</li>
              </ul>
            </div>

            {/* Message Limit */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                <span className="font-semibold">Limit:</span> 2000 characters per message
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Main Page Component with ChatProvider
export default function HelpPage() {
  return (
    <ChatProvider>
      <ChatPageContent />
    </ChatProvider>
  );
}
