import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import { AppleChatMessage } from "./AppleChatMessage";
import type { Message } from "./types";

describe("AppleChatMessage", () => {
  const mockTextMessage: Message = {
    id: "1",
    type: "text",
    content: "Hello, this is a test message",
    sender: "user1",
    timestamp: new Date("2024-01-01T10:00:00"),
    isUser: false,
  };

  const mockUserMessage: Message = {
    ...mockTextMessage,
    id: "2",
    isUser: true,
    sender: "currentUser",
  };

  it("renders text message content", () => {
    render(<AppleChatMessage message={mockTextMessage} />);
    
    expect(screen.getByText("Hello, this is a test message")).toBeInTheDocument();
  });

  it("applies gray styling for incoming messages", () => {
    render(<AppleChatMessage message={mockTextMessage} />);
    
    const messageElement = screen.getByTestId("apple-message-incoming");
    expect(messageElement).toHaveClass("bg-gray-200", "text-black");
  });

  it("applies green styling for outgoing messages", () => {
    render(<AppleChatMessage message={mockUserMessage} />);
    
    const messageElement = screen.getByTestId("apple-message-outgoing");
    expect(messageElement).toHaveClass("bg-green-500", "text-white");
  });

  it("aligns incoming messages to the left", () => {
    render(<AppleChatMessage message={mockTextMessage} />);
    
    const container = screen.getByTestId("apple-message-container");
    expect(container).toHaveClass("justify-start");
  });

  it("aligns outgoing messages to the right", () => {
    render(<AppleChatMessage message={mockUserMessage} />);
    
    const container = screen.getByTestId("apple-message-container");
    expect(container).toHaveClass("justify-end");
  });

  it("renders image messages", () => {
    const imageMessage: Message = {
      ...mockTextMessage,
      type: "image",
      imageUrl: "/test-image.jpg",
      alt: "Test image",
    };
    
    render(<AppleChatMessage message={imageMessage} />);
    
    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
  });

  it("shows message tail for last message in group", () => {
    render(<AppleChatMessage message={mockTextMessage} isLastInGroup />);
    
    expect(screen.getByTestId("apple-message-tail")).toBeInTheDocument();
  });

  it("hides message tail for non-last messages", () => {
    render(<AppleChatMessage message={mockTextMessage} isLastInGroup={false} />);
    
    expect(screen.queryByTestId("apple-message-tail")).not.toBeInTheDocument();
  });
});