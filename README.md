# Voice Assistant

A modern voice assistant application built with React Router 7 and Vapi.ai, featuring real-time voice interactions and a responsive web interface.

## Features

- 🎤 Real-time voice conversations with AI assistant
- 🗣️ Speech-to-text and text-to-speech capabilities
- 📝 Live transcript display
- 🎨 Modern UI with Tailwind CSS
- ⚡️ Hot Module Replacement (HMR) for development
- 🔒 TypeScript for type safety
- 🚀 Server-side rendering with React Router 7

## Prerequisites

Before running this project locally, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** (recommended package manager)
- A **Vapi.ai account** and API credentials

### Installing pnpm

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd VoiceAssistant
```

### 2. Install Dependencies

Navigate to the UI directory and install dependencies:

```bash
cd ui
pnpm install
```

### 3. Environment Setup

The application uses Vapi.ai for voice functionality. You'll need to:

1. Sign up for a [Vapi.ai account](https://vapi.ai)
2. Create an assistant and get your API credentials
3. Update the API key and assistant ID in `ui/app/routes/home.tsx`:

```typescript
const apiKey: string = "your-vapi-api-key";
const assistantId: string = "your-assistant-id";
```

**Note:** For production use, these should be stored as environment variables instead of hardcoded values.

### 4. Run the Development Server

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
VoiceAssistant/
├── ui/                          # Frontend React Router application
│   ├── app/                     # Application source code
│   │   ├── routes/             # Route components
│   │   │   └── home.tsx        # Main voice assistant interface
│   │   └── routes.ts           # Route configuration
│   ├── public/                 # Static assets
│   ├── package.json            # Dependencies and scripts
│   ├── vite.config.ts          # Vite configuration
│   ├── react-router.config.ts  # React Router configuration
│   └── tsconfig.json           # TypeScript configuration
├── server/                      # Backend server (if needed)
└── README.md                   # This file
```

## Available Scripts

In the `ui` directory, you can run:

### Development

- `pnpm run dev` - Start development server with HMR
- `pnpm run typecheck` - Run TypeScript type checking

### Production

- `pnpm run build` - Create production build
- `pnpm run start` - Start production server

## Development Workflow

1. **Start Development Server**: Run `pnpm run dev` in the `ui` directory
2. **Make Changes**: Edit files in the `app` directory
3. **View Changes**: The browser will automatically reload with your changes
4. **Type Checking**: Run `pnpm run typecheck` to ensure type safety

## Voice Assistant Features

- **Voice Activation**: Click to start/stop voice conversations
- **Real-time Transcription**: See your speech converted to text live
- **Assistant Responses**: Hear and see AI-generated responses
- **Call Management**: Visual indicators for call status and speaking state
- **Transcript History**: View the full conversation history

## Customization

### Styling

The project uses Tailwind CSS for styling. You can customize the appearance by:

- Editing the Tailwind classes in the React components
- Modifying the Tailwind configuration if needed

### Voice Assistant Behavior

To customize the assistant's behavior:

1. Log into your Vapi.ai dashboard
2. Modify your assistant's configuration
3. Update the `assistantId` in the code if you create a new assistant

## Deployment

### Docker Deployment

The UI includes a Dockerfile for containerized deployment:

```bash
cd ui
docker build -t voice-assistant .
docker run -p 3000:3000 voice-assistant
```

### Manual Deployment

1. Build the application:
   ```bash
   cd ui
   pnpm run build
   ```

2. Deploy the `build` directory to your hosting platform

The application can be deployed to platforms like:
- Vercel
- Netlify
- AWS
- Google Cloud
- Digital Ocean
- Railway
- Fly.io

## Security Considerations

- **API Keys**: Never commit API keys to version control
- **Environment Variables**: Use environment variables for sensitive data in production
- **HTTPS**: Ensure your deployment uses HTTPS for microphone access
- **CORS**: Configure CORS settings appropriately for your domain

## Troubleshooting

### Common Issues

1. **Microphone Access Denied**
   - Ensure you're running on HTTPS (required for microphone access)
   - Check browser permissions for microphone access

2. **API Connection Issues**
   - Verify your Vapi.ai API key is correct
   - Check your internet connection
   - Ensure the assistant ID exists in your Vapi.ai account

3. **Development Server Issues**
   - Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
   - Check Node.js version compatibility

### Getting Help

- Check the [React Router documentation](https://reactrouter.com/)
- Visit the [Vapi.ai documentation](https://docs.vapi.ai/)
- Review browser console for error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run type checking: `pnpm run typecheck`
5. Submit a pull request

## License

[Add your license information here]

---

Built with ❤️ using React Router 7 and Vapi.ai