# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fake Chat Image Maker - A web app for creating realistic chat screenshots in multiple styles. Users can configure profiles, add messages, and export chats as images. Supports both KakaoTalk and Discord chat styles.

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
- **DiscordChat** (`features/chat/components/DiscordChat.tsx`): Main Discord-style chat UI component with dark theme and server/channel layout.
- **MessageForm** (`features/chat/components/MessageForm.tsx`): Form for adding new messages with React Hook Form + Zod validation
- **ProfileForm** (`features/chat/components/ProfileForm.tsx`): User profile configuration

#### Discord Chat Components

- **DiscordMessage** (`features/chat/components/DiscordMessage.tsx`): Individual message rendering with Discord's dark theme, role-based username colors, and message grouping logic
- **DiscordHeader** (`features/chat/components/DiscordHeader.tsx`): Channel header component displaying server name, channel name with # prefix, member count, and action buttons
- **DiscordInput** (`features/chat/components/DiscordInput.tsx`): Message input field with Discord-style styling, emoji/attachment buttons, and send functionality

### Data Flow

1. ChatProvider wraps the application
2. User selects chat type (KakaoTalk or Discord) in Chat Type tab
3. Forms update chat state via context methods
4. Selected chat component (KakaoTalkChat or DiscordChat) renders real-time preview
5. Export functionality captures the chat container as PNG with appropriate dimensions and styling

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
- KakaoTalk-specific styles are component-scoped with mobile-first design
- Discord-specific styles use dark theme with gray color palette:
  - `bg-gray-800` for main chat background
  - `bg-gray-700` for header and UI elements
  - `bg-gray-600` for input fields
  - Role-based username colors (red, blue, green, yellow, purple, pink, indigo, orange)
  - Message grouping within 5-minute windows (Discord-style)

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
