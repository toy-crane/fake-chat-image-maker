# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fake Chat Image Maker - A web app for creating realistic chat screenshots. Users can configure profiles, add messages, and export the chat as an image. Supports multiple chat platforms including KakaoTalk and Instagram DM.

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
- **KakaoTalkChat** (`features/chat/components/KakaoTalkChat.tsx`): Main chat UI component that renders the KakaoTalk interface. Uses html2canvas-pro for image export.
- **InstagramDMChat** (`features/chat/components/instagram/InstagramDMChat.tsx`): Main chat UI component that renders the Instagram DM interface with purple message bubbles and Instagram-specific styling.
- **MessageForm** (`features/chat/components/MessageForm.tsx`): Form for adding new messages with React Hook Form + Zod validation
- **ProfileForm** (`features/chat/components/ProfileForm.tsx`): User profile configuration

### Data Flow

1. ChatProvider wraps the application
2. Forms update chat state via context methods
3. KakaoTalkChat renders real-time preview
4. Export functionality captures the chat container as PNG

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

### Instagram DM Feature

**Instagram-style Chat Interface**: Complete Instagram Direct Message UI implementation with platform-specific design.

- **Location**: `features/chat/components/instagram/` directory
- **Components**:
  - `InstagramDMChat.tsx` - Main container with 375x844px mobile viewport
  - `InstagramStatusBar.tsx` - Status bar with time, signal, wifi, and battery indicators
  - `InstagramChatHeader.tsx` - Header with user profile, back button, phone/video call actions
  - `InstagramChatMessage.tsx` - Message bubbles with Instagram's purple color scheme
  - `InstagramChatInput.tsx` - Input area with camera, microphone, gallery, sticker, and more buttons
- **Design Features**:
  - Purple (#8B3DFF) message bubbles for user messages
  - Light gray bubbles for other user messages
  - Profile pictures shown on every message (Instagram style)
  - Rounded message bubbles (18px border radius)
  - Instagram-specific icons and layout
- **Reuses**: ChatContext for state management, MessageForm for message creation, export functionality
- **Testing**: Comprehensive test suite with 32 tests covering all components and interactions
