import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';

// Store for rate limiting (in production, use Redis)
const requestCounts = new Map();
const RATE_LIMIT = 10; // 10 requests per minute per IP
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

// Helper to get client IP
function getClientIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

// Helper to check rate limit
function checkRateLimit(ip) {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Sanitize user input to prevent XSS
function sanitizeInput(text) {
  return text
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 2000) // Enforce max length
    .trim();
}

// Build system prompt with context
function getSystemPrompt() {
  return `You are a helpful AI assistant for an e-commerce store. You help customers with:
- Product inquiries and recommendations
- Order tracking and status
- Return and refund policies
- Shipping information
- Account and payment questions
- General customer support

Be friendly, concise, and professional. If you don't know something, be honest about it.
Keep responses under 300 words when possible. Use clear formatting with line breaks.`;
}

// Build messages for the AI model
function buildMessages(conversationHistory, userMessage) {
  const messages = [];

  // Add recent conversation history (last 10 messages)
  const recentHistory = conversationHistory.slice(-10);
  for (const msg of recentHistory) {
    messages.push({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    });
  }

  // Add current user message
  messages.push({
    role: 'user',
    content: userMessage,
  });

  return messages;
}

export async function POST(request) {
  try {
    // Check rate limiting
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
      return Response.json(
        { error: 'Too many requests. Please wait a moment before sending another message.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return Response.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    const sanitizedMessage = sanitizeInput(message);

    if (!sanitizedMessage) {
      return Response.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    console.log('[v0] Chat API: Processing message from user');

    // Build message history for context
    const messages = buildMessages(conversationHistory, sanitizedMessage);

    // Call Groq API with streaming support
    const response = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: getSystemPrompt(),
      messages,
      temperature: 0.7,
      maxTokens: 500,
    });

    if (!response.text) {
      throw new Error('Empty response from AI');
    }

    console.log('[v0] Chat API: Successfully generated response');

    return Response.json({
      message: response.text,
      success: true,
    });
  } catch (error) {
    console.error('[v0] Chat API error:', error);

    // Determine error type and provide appropriate response
    let errorMessage = 'An error occurred while processing your message';
    let statusCode = 500;

    if (error.message?.includes('API key')) {
      errorMessage = 'AI service is not configured. Please contact support.';
      statusCode = 503;
    } else if (error.message?.includes('rate limit') || error.code === 'ERR_RATE_LIMITED') {
      errorMessage = 'Too many requests. Please wait a moment.';
      statusCode = 429;
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'Request took too long. Please try again.';
      statusCode = 504;
    }

    return Response.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}

// HEAD request handler for health checks
export async function HEAD() {
  return new Response(null, { status: 200 });
}
