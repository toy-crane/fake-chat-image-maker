import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { InstagramChatMessage } from "./InstagramChatMessage";
import type { Message } from "@/features/chat/components/types";

describe("InstagramChatMessage", () => {
  const mockTextMessage: Message = {
    id: "1",
    type: "text",
    content: "Hello Instagram!",
    sender: "user1",
    timestamp: new Date("2024-01-01T10:00:00"),
    isUser: false,
  };

  const mockUserMessage: Message = {
    id: "2",
    type: "text",
    content: "Hi there!",
    sender: "me",
    timestamp: new Date("2024-01-01T10:01:00"),
    isUser: true,
  };

  const mockImageMessage: Message = {
    id: "3",
    type: "image",
    imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzAwZiIvPg==",
    alt: "Test image",
    sender: "user1",
    timestamp: new Date("2024-01-01T10:02:00"),
    isUser: false,
  };

  const mockUser = {
    id: "user1",
    name: "이동범",
    avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNkZGQiLz4=",
  };

  it("renders text message from other user", () => {
    render(
      <InstagramChatMessage
        message={mockTextMessage}
        showSender={true}
        showTimestamp={true}
        showAvatar={true}
        senderName="이동범"
        senderAvatar={mockUser.avatar}
      />
    );

    expect(screen.getByText("Hello Instagram!")).toBeInTheDocument();
    expect(screen.getByText("이동범")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
  });

  it("renders text message from current user with purple background", () => {
    render(
      <InstagramChatMessage
        message={mockUserMessage}
        showSender={false}
        showTimestamp={true}
        showAvatar={false}
      />
    );

    const messageElement = screen.getByText("Hi there!");
    expect(messageElement).toBeInTheDocument();
    
    // Check for Instagram's purple color
    const messageBubble = messageElement.closest('[data-testid="message-bubble"]');
    expect(messageBubble).toHaveClass("bg-[#8B3DFF]"); // Instagram purple
  });

  it("renders image message", () => {
    render(
      <InstagramChatMessage
        message={mockImageMessage}
        showSender={true}
        showTimestamp={true}
        showAvatar={true}
        senderName="이동범"
        senderAvatar={mockUser.avatar}
      />
    );

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("data:image/svg+xml;base64"));
  });

  it("shows avatar for every message (Instagram style)", () => {
    render(
      <InstagramChatMessage
        message={mockTextMessage}
        showSender={true}
        showTimestamp={false}
        showAvatar={true}
        senderName="이동범"
        senderAvatar={mockUser.avatar}
      />
    );

    const avatar = screen.getByTestId("message-avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", expect.stringContaining("data:image/svg+xml;base64"));
  });

  it("does not show avatar for user's own messages", () => {
    render(
      <InstagramChatMessage
        message={mockUserMessage}
        showSender={false}
        showTimestamp={true}
        showAvatar={false}
      />
    );

    expect(screen.queryByTestId("message-avatar")).not.toBeInTheDocument();
  });

  it("formats timestamp correctly", () => {
    render(
      <InstagramChatMessage
        message={mockTextMessage}
        showSender={false}
        showTimestamp={true}
        showAvatar={false}
        senderName="이동범"
        senderAvatar={mockUser.avatar}
      />
    );

    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
  });
});