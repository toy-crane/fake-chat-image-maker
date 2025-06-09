import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { InstagramDMChat } from "./InstagramDMChat";
import { Message, User } from "./types";

const mockCurrentUser: User = {
  id: "user1",
  name: "Current User",
  avatar: "avatar1.jpg",
};

const mockOtherUser: User = {
  id: "user2", 
  name: "Other User",
  avatar: "avatar2.jpg",
};

const mockMessages: Message[] = [
  {
    id: "1",
    type: "text", 
    content: "Hello Instagram!",
    sender: mockCurrentUser,
    timestamp: new Date("2024-01-01T10:00:00Z"),
    isUser: true,
  },
  {
    id: "2",
    type: "text",
    content: "Hey there!",
    sender: mockOtherUser,
    timestamp: new Date("2024-01-01T10:05:00Z"),
    isUser: false,
  },
  {
    id: "3", 
    type: "image",
    imageUrl: "/test-image.jpg",
    alt: "Test image",
    sender: mockCurrentUser,
    timestamp: new Date("2024-01-01T10:10:00Z"),
    isUser: true,
  },
];

describe("InstagramDMChat", () => {
  it("renders Instagram DM container with dark theme", () => {
    render(
      <InstagramDMChat
        messages={mockMessages}
        chatTitle={mockOtherUser.name}
      />
    );

    // Should have dark background 
    const container = screen.getByTestId("instagram-dm-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("bg-black");
  });

  it("renders all messages in correct order", () => {
    render(
      <InstagramDMChat
        messages={mockMessages}
        chatTitle={mockOtherUser.name}
      />
    );

    const messageElements = screen.getAllByTestId(/instagram-message-/);
    expect(messageElements).toHaveLength(3);
  });

  it("displays Instagram header with chat title", () => {
    render(
      <InstagramDMChat
        messages={mockMessages}
        chatTitle={mockOtherUser.name}
      />
    );

    expect(screen.getByTestId("instagram-header")).toBeInTheDocument();
    expect(screen.getByText(mockOtherUser.name)).toBeInTheDocument();
  });

  it("renders Instagram status bar", () => {
    render(
      <InstagramDMChat
        messages={mockMessages}
        chatTitle={mockOtherUser.name}
      />
    );

    expect(screen.getByTestId("instagram-status-bar")).toBeInTheDocument();
  });

  it("renders Instagram input area", () => {
    render(
      <InstagramDMChat
        messages={mockMessages}
        chatTitle={mockOtherUser.name}
      />
    );

    expect(screen.getByTestId("instagram-input")).toBeInTheDocument();
  });

  it("applies correct Instagram DM dimensions", () => {
    render(
      <InstagramDMChat
        messages={mockMessages}
        chatTitle={mockOtherUser.name}
      />
    );

    const container = screen.getByTestId("instagram-dm-container");
    expect(container).toHaveClass("w-[375px]");
    expect(container).toHaveClass("h-[844px]");
  });

  it("handles empty messages array", () => {
    render(
      <InstagramDMChat
        messages={[]}
        chatTitle={mockOtherUser.name}
      />
    );

    const container = screen.getByTestId("instagram-dm-container");
    expect(container).toBeInTheDocument();
    expect(screen.queryByTestId(/instagram-message-/)).not.toBeInTheDocument();
  });

  it("accepts custom className", () => {
    const customClass = "custom-class";
    render(
      <InstagramDMChat
        messages={mockMessages}
        chatTitle={mockOtherUser.name}
        className={customClass}
      />
    );

    const container = screen.getByTestId("instagram-dm-container");
    expect(container).toHaveClass(customClass);
  });

  it("shows correct message grouping for consecutive messages", () => {
    const consecutiveMessages: Message[] = [
      {
        id: "1",
        type: "text",
        content: "First message",
        sender: mockCurrentUser,
        timestamp: new Date("2024-01-01T10:00:00Z"),
        isUser: true,
      },
      {
        id: "2", 
        type: "text",
        content: "Second message same minute",
        sender: mockCurrentUser,
        timestamp: new Date("2024-01-01T10:00:30Z"), // Same minute
        isUser: true,
      },
    ];

    render(
      <InstagramDMChat
        messages={consecutiveMessages}
        chatTitle={mockOtherUser.name}
      />
    );

    // Should group consecutive messages from same sender
    const messageElements = screen.getAllByTestId(/instagram-message-/);
    expect(messageElements).toHaveLength(2);
  });
});