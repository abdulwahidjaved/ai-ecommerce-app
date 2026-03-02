# AI Chat Assistant Feature

## Overview

The AI Chat Assistant is a real-time chat interface that enables users to interact with an AI-powered support system. It provides instant help with product inquiries, order tracking, policies, and general customer support.

## Architecture

### Components

#### Context: `ChatContext.js`
Manages global chat state including messages, loading states, errors, and typing indicators.

**Features:**
- Message history with localStorage persistence (max 50 messages)
- Error state management
- Loading and typing indicators
- Methods: `sendMessage()`, `clearChat()`, `removeMessage()`

**Storage:**
- Uses browser localStorage for conversation persistence
- Automatically loads previous conversations on mount
- Maintains only last 50 messages for performance

#### Components

**ChatMessage** (`ChatMessage.js`)
- Displays individual messages with sender identification
- Copy message functionality
- Error state styling
- Timestamps on all messages
- Remove message option for user messages

**MessageInput** (`MessageInput.js`)
- Multi-line textarea with auto-resize
- Character counter (2000 char limit)
- Keyboard shortcuts:
  - `Ctrl+Enter` or `Cmd+Enter`: Send message
  - `Shift+Enter`: New line
- Submit button with loading state
- Character limit progress bar

**TypingIndicator** (`TypingIndicator.js`)
- Shows AI is processing/typing
- Three-dot animated indicator
- Smooth fade-in animation

**ChatContainer** (`ChatContainer.js`)
- Displays all messages
- Auto-scrolls to latest message
- Empty state with example prompts
- Wraps messages with hover effects

### Pages

**Help Page** (`/help`)
- Protected route (requires authentication)
- Main chat interface
- Sidebar with chat info and keyboard shortcuts
- Clear chat functionality
- Error handling and alerts
- Responsive design (sidebar hidden on mobile)

### API

**Chat API** (`/api/chat`)

Endpoint: `POST /api/chat`

**Request:**
```json
{
  "message": "user message",
  "conversationHistory": [
    { "sender": "user", "text": "..." },
    { "sender": "ai", "text": "..." }
  ]
}
```

**Response:**
```json
{
  "message": "AI response text",
  "success": true
}
```

**Features:**
- Rate limiting: 10 requests per minute per IP
- Input sanitization (XSS prevention)
- Character limit enforcement (2000 chars)
- Conversation context (last 10 messages)
- Error handling with specific status codes
- Graceful fallbacks

**Rate Limiting:**
- 10 requests per minute per IP address
- Returns 429 status when exceeded
- Window resets after 1 minute

**Error Codes:**
- 400: Invalid message format
- 429: Rate limit exceeded
- 500: Server error
- 503: Service unavailable (AI service not configured)
- 504: Request timeout

## Features

### User-Facing Features

1. **Real-time Chat Interface**
   - Send and receive messages instantly
   - Visible typing indicators
   - Message timestamps
   - Conversation history

2. **Message Management**
   - Copy message to clipboard
   - Remove user messages from conversation
   - Clear entire conversation with confirmation
   - Auto-scroll to latest message

3. **Input Validation**
   - 2000 character limit per message
   - Empty message prevention
   - Character counter with visual progress
   - XSS prevention through sanitization

4. **Keyboard Support**
   - Ctrl+Enter to send
   - Shift+Enter for new lines
   - Accessible keyboard shortcuts

5. **Responsive Design**
   - Mobile-optimized chat interface
   - Desktop sidebar with chat info
   - Flexible layout
   - Touch-friendly buttons

### Developer Features

1. **Clean Separation of Concerns**
   - Context for state management
   - Reusable components
   - API route for backend logic
   - Utility functions for validation

2. **Error Handling**
   - User-friendly error messages
   - Toast notifications for feedback
   - Graceful fallbacks
   - Detailed console logging

3. **Security**
   - Input sanitization
   - Rate limiting
   - Character limits
   - Protected routes (auth required)
   - No sensitive data in client state

4. **Performance**
   - Message history limit (50 messages)
   - Lazy loading
   - Optimized re-renders
   - Auto-scroll optimization

5. **Scalability**
   - Rate limiting ready for multiple users
   - localStorage isolation per browser
   - API designed for async operations
   - Conversation context limitation

## Security Considerations

### Input Validation
- All user input is sanitized to prevent XSS
- Angle brackets and special characters are removed
- Character limit enforced (2000 chars)

### Rate Limiting
- 10 requests per minute per IP
- Prevents abuse and API rate limit hits
- In-memory storage (use Redis in production)

### Authentication
- Chat page protected behind login
- Only authenticated users can access
- User isolation in localStorage

### Error Handling
- Sensitive error details not exposed to client
- Generic error messages for API failures
- Specific errors logged server-side

## Usage Examples

### Sending a Message

```javascript
const { sendMessage } = useChat();

// Send a message
await sendMessage('What is your return policy?');
```

### Clearing Chat

```javascript
const { clearChat } = useChat();

// Clear all messages
clearChat();
```

### Accessing Messages

```javascript
const { messages, isLoading, isTyping } = useChat();

// Use in your component
messages.map(msg => <ChatMessage key={msg.id} message={msg} />);
```

## Testing the Feature

1. **Access the page:**
   - Navigate to `/help` after logging in

2. **Test basic functionality:**
   - Send a message
   - Verify AI response appears
   - Check typing indicator shows
   - Test copy button
   - Clear chat with confirmation

3. **Test validation:**
   - Try sending empty message (blocked)
   - Try sending >2000 characters (truncated)
   - Test message limit indicator

4. **Test keyboard shortcuts:**
   - Press Ctrl+Enter to send
   - Press Shift+Enter for new line
   - Verify both work correctly

5. **Test persistence:**
   - Send messages
   - Refresh page
   - Verify conversation history loads

6. **Test rate limiting:**
   - Send 10+ messages rapidly
   - Should receive rate limit error after 10

## Future Enhancements

1. **Database Integration**
   - Store conversations in database
   - Cross-device conversation history
   - User conversation analytics

2. **Advanced Features**
   - File upload support
   - Image generation
   - Product search integration
   - Order lookup with personal data

3. **Personalization**
   - User preferences
   - Conversation tags/labels
   - Search previous conversations
   - Export conversation

4. **Admin Tools**
   - Conversation analytics
   - Common questions tracking
   - Performance monitoring
   - Manual intervention queues

5. **Performance**
   - Migrate rate limiting to Redis
   - Message caching
   - Response optimization
   - Connection pooling

## Troubleshooting

### Messages not sending
- Check internet connection
- Verify GROQ_API_KEY is set
- Check browser console for errors
- Rate limit may be exceeded (wait 1 minute)

### AI not responding
- API key might not be configured
- Service might be temporarily unavailable
- Check rate limits
- Verify request format

### Conversation not persisting
- Check localStorage is enabled
- Verify browser privacy mode isn't blocking storage
- Check storage quota isn't exceeded

### Keyboard shortcuts not working
- Verify focus is on text input
- Check browser extensions interfering
- Test on different browser if issue persists

## Environment Variables

Required for production:
```
GROQ_API_KEY=your_groq_api_key
```

Set in `.env.local`:
```
GROQ_API_KEY="gsk_xxx..."
```

## Performance Metrics

- Average response time: 1-3 seconds
- Message load time: <100ms
- Storage per conversation: ~50KB (50 messages)
- Rate limit: 10 req/min per IP
- Max message length: 2000 characters
- Max conversation history: 50 messages

## Support

For issues or questions:
1. Check console for error messages
2. Verify GROQ_API_KEY environment variable
3. Clear browser cache and localStorage if needed
4. Test in incognito window to rule out extensions
5. Contact support if problems persist
