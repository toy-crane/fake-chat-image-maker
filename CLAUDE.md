# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fake Chat Image Maker - A web app for creating realistic chat screenshots for both KakaoTalk and Apple Messages. Users can configure profiles, add messages, and export the chat as an image with a toggle to switch between messaging platforms.

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

- **ChatContext** (`lib/contexts/ChatContext.tsx`): Central state management for chat data (users, messages). All chat operations go through this context.
- **KakaoTalkChat** (`features/chat/components/KakaoTalkChat.tsx`): Main chat UI component that renders the KakaoTalk interface. Uses html2canvas-pro for image export.
- **AppleMessageChat** (`features/chat/components/AppleMessageChat.tsx`): Main chat UI component that renders the Apple Messages interface with iOS-style design and layout.
- **MessageForm** (`features/chat/components/MessageForm.tsx`): Form for adding new messages with React Hook Form + Zod validation
- **ProfileForm** (`features/chat/components/ProfileForm.tsx`): User profile configuration

### Apple Messages Components

- **AppleStatusBar** (`features/chat/components/AppleStatusBar.tsx`): iOS-style status bar with time, signal, wifi, and battery indicators
- **AppleHeader** (`features/chat/components/AppleHeader.tsx`): Navigation header with back arrow, contact name, and profile circle
- **AppleChatMessage** (`features/chat/components/AppleChatMessage.tsx`): Message bubbles with Apple's gray/green styling and proper alignment
- **AppleChatInput** (`features/chat/components/AppleChatInput.tsx`): SMS input field with microphone icon and attachment button

### Data Flow

1. ChatProvider wraps the application
2. Forms update chat state via context methods
3. Interface toggle determines which chat component to render (KakaoTalk or Apple Messages)
4. Both chat interfaces share the same data from ChatContext
5. Export functionality captures the chat container as PNG

### Interface Toggle

The application includes a toggle switch in the header that allows users to switch between:
- **KakaoTalk Mode**: Yellow-themed chat interface with KakaoTalk styling
- **Apple Messages Mode**: iOS-themed chat interface with Apple Messages styling

Both interfaces use the same underlying data structure and support all features (message types, export, etc.).

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

Uses Shadcn/ui components (found in `components/ui/`). When adding new UI elements, check if a Shadcn component exists first. Custom components are in `components/kakao/` for KakaoTalk-specific UI.

**Images**: Always use Next.js `<Image />` component instead of HTML `<img>` tags for better performance, automatic optimization, and LCP improvements.

### Styling

- Tailwind CSS v4 with CSS variables defined in `app/globals.css`
- Prefer semantic color tokens (e.g., `bg-background`, `text-foreground`) over hardcoded colors
- KakaoTalk-specific styles are component-scoped

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
