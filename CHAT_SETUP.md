# Chat Assistant Setup Guide

This document outlines the setup and configuration for the Chat Assistant interface that replaces the original voice-based functionality.

## Overview

The application has been converted from a voice-based assistant to a chat-based interface while maintaining all the PRD generation and preview functionality. Users can now type messages instead of speaking to interact with the AI assistant.

## Changes Made

### 1. New Components
- **`ChatInput.tsx`** - Replaces `VoiceControl.tsx` with a text input interface
- **`useChat.ts`** - New hook that replaces `useVapi.ts` for chat functionality
- **`/api/chat.ts`** - API endpoint for handling chat messages with streaming responses

### 2. Updated Components
- **`home.tsx`** - Updated to use chat functionality instead of voice
- **`ConversationDisplay.tsx`** - Updated welcome message for chat interface
- **`Navbar.tsx`** - Changed branding from "Voice Assistant" to "Chat Assistant"

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**Get your API key from:** https://platform.openai.com/api-keys

### 2. Dependencies

The chat functionality requires the following dependencies (should already be installed):

```json
{
  "openai": "^4.x.x",
  "react": "^18.x.x"
}
```

### 3. Start the Application

```bash
npm install
npm run dev
```

## How to Use

### Starting a Chat Session
1. Click the "Start Chat" button
2. Type your message in the text input field
3. Press Enter to send (or Shift+Enter for new lines)
4. The AI will respond with streaming text

### Features
- **Real-time typing indicators** - Shows when AI is responding
- **Message editing** - Edit your last message and regenerate responses
- **Transcript panel** - View full conversation history
- **PRD Generation** - Automatically generates Product Requirement Documents
- **Preview Generation** - Creates application previews based on conversations

## API Configuration

### Chat Endpoint: `/api/chat`

**Method:** POST

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Your message here"
    }
  ]
}
```

**Response:** Streaming text response

### System Prompt
The AI is configured with the following system prompt:
> "You are a helpful AI assistant that helps users build applications. You are knowledgeable about software development, product management, and can help users define their requirements and create applications. Be concise but thorough in your responses."

## File Structure

```
VoiceAssistant/
├── ui/app/
│   ├── components/
│   │   ├── ChatInput.tsx          # New chat input component
│   │   ├── ConversationDisplay.tsx # Updated for chat
│   │   ├── Navbar.tsx            # Updated branding
│   │   └── ...
│   ├── hooks/
│   │   ├── useChat.ts            # New chat hook
│   │   ├── useVapi.ts            # Legacy (can be removed)
│   │   └── ...
│   ├── routes/
│   │   ├── api/
│   │   │   ├── chat.ts           # New chat API endpoint
│   │   │   └── ...
│   │   ├── home.tsx              # Updated main component
│   │   └── ...
├── .env.example                  # Environment template
└── CHAT_SETUP.md                # This file
```

## Troubleshooting

### Common Issues

1. **"Internal server error" when sending messages**
   - Verify your OpenAI API key is set correctly
   - Check that you have sufficient API credits
   - Ensure the `.env` file is in the correct location

2. **TypeScript errors**
   - Make sure all dependencies are installed: `npm install`
   - Restart your development server: `npm run dev`

3. **Streaming not working**
   - Check browser console for network errors
   - Verify the `/api/chat` endpoint is accessible
   - Ensure WebSocket/streaming is supported by your deployment

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Migration from Voice

If migrating from the voice version:

1. **Remove Vapi dependencies** - The `@vapi-ai/web` package is no longer needed
2. **Update environment** - Replace Vapi credentials with OpenAI API key
3. **Test chat functionality** - Ensure all features work with text input

## Future Enhancements

Potential improvements for the chat interface:

- **Message persistence** - Save conversations between sessions
- **Multiple AI models** - Allow users to choose different models
- **File uploads** - Support for image/document uploads
- **Voice input option** - Add speech-to-text for hybrid functionality
- **Chat themes** - Customizable UI themes
- **Export functionality** - Export conversations as PDF/text

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify your environment configuration
3. Check browser console for error messages
4. Ensure all dependencies are properly installed