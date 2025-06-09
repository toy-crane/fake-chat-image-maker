import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { DiscordChat } from "./DiscordChat";
import { Message, User } from "./types";

const mockUser1: User = {
  id: "user1",
  name: "Alice",
  avatar: "alice.jpg",
};

const mockUser2: User = {
  id: "user2", 
  name: "Bob",
  avatar: "bob.jpg",
};

const mockMessages: Message[] = [
  {
    id: "1",
    type: "text",
    content: "Hello Discord!",
    sender: mockUser1,
    timestamp: new Date("2024-01-01T10:00:00Z"),
    isUser: true,
  },
  {
    id: "2",
    type: "text",
    content: "Hey there!",
    sender: mockUser2,
    timestamp: new Date("2024-01-01T10:05:00Z"),
    isUser: false,
  },
];

describe("DiscordChat", () => {
  it("renders with dark theme styling", () => {
    render(
      <DiscordChat
        messages={mockMessages}
        channelName="general"
        serverName="Test Server"
      />
    );

    // Should have dark background
    const container = screen.getByTestId("discord-chat");
    expect(container).toHaveClass("bg-gray-800");
  });

  it("displays server and channel name in header", () => {
    render(
      <DiscordChat
        messages={mockMessages}
        channelName="general"
        serverName="Test Server"
      />
    );

    expect(screen.getByText("Test Server")).toBeInTheDocument();
    expect(screen.getByText("#general")).toBeInTheDocument();
  });

  it("renders all messages", () => {
    render(
      <DiscordChat
        messages={mockMessages}
        channelName="general"
        serverName="Test Server"
      />
    );

    expect(screen.getByText("Hello Discord!")).toBeInTheDocument();
    expect(screen.getByText("Hey there!")).toBeInTheDocument();
  });

  it("has correct Discord-style dimensions", () => {
    render(
      <DiscordChat
        messages={mockMessages}
        channelName="general"
        serverName="Test Server"
      />
    );

    const container = screen.getByTestId("discord-chat");
    expect(container).toHaveClass("w-[400px]", "h-[600px]");
  });

  it("renders with custom className", () => {
    render(
      <DiscordChat
        messages={mockMessages}
        channelName="general"
        serverName="Test Server"
        className="custom-class"
      />
    );

    const container = screen.getByTestId("discord-chat");
    expect(container).toHaveClass("custom-class");
  });

  it("renders DiscordInput component", () => {
    render(
      <DiscordChat
        messages={mockMessages}
        channelName="general"
        serverName="Test Server"
      />
    );

    expect(screen.getByTestId("discord-input")).toBeInTheDocument();
  });
});