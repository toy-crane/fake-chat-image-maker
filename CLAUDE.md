# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fake Chat Image Maker - A web app for creating realistic KakaoTalk and Telegram chat screenshots. Users can configure profiles, add messages, switch between chat platforms, and export the chat as an image.

## Commands

```bash
# Development
bun dev         # Start dev server with Turbopack

# Build & Production
bun build       # Create production build
bun start       # Start production server

# Testing
bun test        # Run all tests
bun test [file] # Run specific test file

# Linting
bun lint        # Run ESLint
```

## Architecture

### Core Components

- **ChatContext** (`contexts/ChatContext.tsx`): Central state management for chat data (users, messages). All chat operations go through this context.
- **KakaoTalkChat** (`features/chat/components/KakaoTalkChat.tsx`): Main chat UI component that renders the KakaoTalk interface with yellow bubbles and blue background.
- **TelegramChat** (`features/chat/components/TelegramChat.tsx`): Main chat UI component that renders the Telegram interface with green bubbles, timestamps below messages, and patterned background.
- **MessageForm** (`features/chat/components/MessageForm.tsx`): Form for adding new messages with React Hook Form + Zod validation
- **ProfileForm** (`features/chat/components/ProfileForm.tsx`): User profile configuration

### Chat Platform Components

**KakaoTalk Components:**
- **ChatHeader**: Header with back button, title, and action icons
- **ChatMessage**: Message bubbles with sender info and timestamps beside messages
- **StatusBar**: Simple status bar with time and basic indicators
- **ChatInput**: Input area with emoji, attachment, and send options

**Telegram Components:**
- **TelegramHeader**: Header with back button, contact name, and "last seen recently" status
- **TelegramMessage**: Message bubbles with green (outgoing) and white (incoming) styling, timestamps below messages
- **TelegramStatusBar**: iOS-style status bar with signal, WiFi, and battery indicators
- **TelegramInput**: Input area with attachment and voice message icons

### Data Flow

1. ChatProvider wraps the application
2. Forms update chat state via context methods
3. Chat type selector switches between KakaoTalk and Telegram interfaces
4. Selected chat component (KakaoTalkChat or TelegramChat) renders real-time preview
5. Export functionality captures the chat container as PNG with platform-specific filename

### Testing

Project uses Bun test with React Testing Library. Test files use `.test.tsx` extension. The setup is already configured in:

- `happydom.ts` - DOM environment
- `testing-library.ts` - Matchers and cleanup
- `bunfig.toml` - Test preloading

**Linting**: ESLint is configured to include test files with stricter rules:

- `@typescript-eslint/no-explicit-any: error` - Prohibits `any` type usage in tests
- `@typescript-eslint/no-unused-vars: error` - Ensures no unused variables in tests
- Test files (`.test.ts`, `.test.tsx`, `.spec.ts`, `.spec.tsx`) are linted with the main codebase

**Deployment Note**: Test files are excluded from production builds in `tsconfig.json` to prevent Vercel build failures with `bun:test` imports.

### UI Components

Uses Shadcn/ui components (found in `components/ui/`). When adding new UI elements, check if a Shadcn component exists first. Platform-specific components are in `features/chat/components/` with naming conventions:
- KakaoTalk components: `ChatHeader`, `ChatMessage`, `StatusBar`, `ChatInput`
- Telegram components: `TelegramHeader`, `TelegramMessage`, `TelegramStatusBar`, `TelegramInput`

**Images**: Always use Next.js `<Image />` component instead of HTML `<img>` tags for better performance, automatic optimization, and LCP improvements.

### Styling

- Tailwind CSS v4 with CSS variables defined in `app/globals.css`
- Prefer semantic color tokens (e.g., `bg-background`, `text-foreground`) over hardcoded colors
- Platform-specific styles are component-scoped:
  - **KakaoTalk**: Blue backgrounds, yellow message bubbles, timestamps beside messages
  - **Telegram**: Green pattern background, green/white message bubbles, timestamps below messages

### JSON Import Feature

**Bulk Message Import**: Users can import multiple messages at once via JSON file upload.

- **Location**: "Import JSON" button in MessageForm header (only visible when `onAddBulkMessages` prop is provided)
- **Format**: Array of `MessageFormData` objects with validation via `bulkImportSchema`
- **Validation**: Comprehensive error handling with specific feedback for malformed JSON or validation errors
- **AI Integration**: Provides AI-powered prompt template to help users generate correct JSON format
- **Implementation**:
  - `bulkImportSchema` in `lib/schemas/message.ts` for validation
  - `addBulkMessages()` method in `ChatContext` for bulk insertion
  - Shadcn Dialog component for user interface
  - File upload with `.json` restriction and drag-drop styling
