import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { TelegramChat } from "./TelegramChat";
import { Message, User } from "./types";

const mockUser: User = {
  id: "user1",
  name: "Alex Smith",
  avatar: "user1.jpg",
};

const mockOtherUser: User = {
  id: "user2",
  name: "Sam Lee",
  avatar: "user2.jpg",
};

const mockMessages: Message[] = [
  {
    id: "1",
    type: "text",
    content: "Hi Alex! It's been a while, how are you doing?",
    sender: mockOtherUser,
    timestamp: new Date("2024-01-01T15:19:00Z"),
    isUser: false,
  },
  {
    id: "2",
    type: "text",
    content: "Hey Sam! I'm good, it's been a busy month.",
    sender: mockUser,
    timestamp: new Date("2024-01-01T15:20:00Z"),
    isUser: true,
  },
  {
    id: "3",
    type: "text",
    content: "Long time no see, are you still based in NY?",
    sender: mockOtherUser,
    timestamp: new Date("2024-01-01T15:20:00Z"),
    isUser: false,
  },
];

describe("TelegramChat", () => {
  it("renders the telegram chat interface", () => {
    render(
      <TelegramChat
        messages={mockMessages}
        chatTitle="Alex Smith"
      />
    );

    expect(screen.getByText("Alex Smith")).toBeInTheDocument();
    expect(screen.getByText("last seen recently")).toBeInTheDocument();
    expect(screen.getByText("Hi Alex! It's been a while, how are you doing?")).toBeInTheDocument();
    expect(screen.getByText("Hey Sam! I'm good, it's been a busy month.")).toBeInTheDocument();
  });

  it("displays status bar with time", () => {
    render(
      <TelegramChat
        messages={mockMessages}
        chatTitle="Alex Smith"
      />
    );

    expect(screen.getByText("9:41")).toBeInTheDocument();
  });

  it("shows 'Today' date separator", () => {
    render(
      <TelegramChat
        messages={mockMessages}
        chatTitle="Alex Smith"
      />
    );

    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("renders telegram input area", () => {
    render(
      <TelegramChat
        messages={mockMessages}
        chatTitle="Alex Smith"
      />
    );

    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <TelegramChat
        messages={mockMessages}
        chatTitle="Alex Smith"
        className="custom-class"
      />
    );

    const container = document.querySelector('.custom-class');
    expect(container).toBeInTheDocument();
  });

  it("renders telegram branding at bottom", () => {
    render(
      <TelegramChat
        messages={mockMessages}
        chatTitle="Alex Smith"
      />
    );

    expect(screen.getByText("Telegram")).toBeInTheDocument();
    expect(screen.getByText("curated by")).toBeInTheDocument();
    expect(screen.getByText("Mobbin")).toBeInTheDocument();
  });

  it("handles empty messages array", () => {
    render(
      <TelegramChat
        messages={[]}
        chatTitle="Alex Smith"
      />
    );

    expect(screen.getByText("Alex Smith")).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  describe("message grouping logic", () => {
    it("groups consecutive messages from same sender correctly", () => {
      const consecutiveMessages: Message[] = [
        {
          id: "1",
          type: "text",
          content: "First message",
          sender: mockUser,
          timestamp: new Date("2024-01-01T15:19:00Z"),
          isUser: true,
        },
        {
          id: "2",
          type: "text",
          content: "Second message",
          sender: mockUser,
          timestamp: new Date("2024-01-01T15:19:00Z"),
          isUser: true,
        },
      ];

      render(
        <TelegramChat
          messages={consecutiveMessages}
          chatTitle="Alex Smith"
        />
      );

      expect(screen.getByText("First message")).toBeInTheDocument();
      expect(screen.getByText("Second message")).toBeInTheDocument();
    });
  });
});