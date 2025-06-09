import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { TelegramMessage } from "./TelegramMessage";
import { Message, User } from "./types";

const mockCurrentUser: User = {
  id: "user1",
  name: "Alex Smith",
  avatar: "user1.jpg",
};

const mockOtherUser: User = {
  id: "user2",
  name: "Sam Lee",
  avatar: "user2.jpg",
};

describe("TelegramMessage", () => {
  describe("outgoing messages (user messages)", () => {
    const userTextMessage: Message = {
      id: "1",
      type: "text",
      content: "Hey Sam! I'm good, it's been a busy month.",
      sender: mockCurrentUser,
      timestamp: new Date("2024-01-01T15:20:00Z"),
      isUser: true,
    };

    it("renders user text message with green bubble", () => {
      render(
        <TelegramMessage
          message={userTextMessage}
          showTimestamp
        />
      );

      expect(screen.getByText("Hey Sam! I'm good, it's been a busy month.")).toBeInTheDocument();
      
      const messageContainer = screen.getByText("Hey Sam! I'm good, it's been a busy month.").closest('div');
      expect(messageContainer).toHaveClass('bg-emerald-500');
    });

    it("displays timestamp when showTimestamp is true", () => {
      render(
        <TelegramMessage
          message={userTextMessage}
          showTimestamp
        />
      );

      expect(screen.getByText("3:20 PM")).toBeInTheDocument();
    });

    it("hides timestamp when showTimestamp is false", () => {
      render(
        <TelegramMessage
          message={userTextMessage}
          showTimestamp={false}
        />
      );

      expect(screen.queryByText("3:20 PM")).not.toBeInTheDocument();
    });

    it("renders user image message", () => {
      const userImageMessage: Message = {
        id: "2",
        type: "image",
        imageUrl: "/test-image.jpg",
        alt: "Test image",
        sender: mockCurrentUser,
        timestamp: new Date("2024-01-01T15:25:00Z"),
        isUser: true,
      };

      render(
        <TelegramMessage
          message={userImageMessage}
          showTimestamp
        />
      );

      const image = screen.getByAltText("Test image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/test-image.jpg");
    });
  });

  describe("incoming messages (other user messages)", () => {
    const otherTextMessage: Message = {
      id: "3",
      type: "text",
      content: "Hi Alex! It's been a while, how are you doing?",
      sender: mockOtherUser,
      timestamp: new Date("2024-01-01T15:19:00Z"),
      isUser: false,
    };

    it("renders other user text message with white bubble", () => {
      render(
        <TelegramMessage
          message={otherTextMessage}
          showTimestamp
        />
      );

      expect(screen.getByText("Hi Alex! It's been a while, how are you doing?")).toBeInTheDocument();
      
      const messageContainer = screen.getByText("Hi Alex! It's been a while, how are you doing?").closest('div');
      expect(messageContainer).toHaveClass('bg-white');
    });

    it("displays timestamp when showTimestamp is true", () => {
      render(
        <TelegramMessage
          message={otherTextMessage}
          showTimestamp
        />
      );

      expect(screen.getByText("3:19 PM")).toBeInTheDocument();
    });

    it("renders other user image message", () => {
      const otherImageMessage: Message = {
        id: "4",
        type: "image",
        imageUrl: "/test-image2.jpg",
        alt: "Another test image",
        sender: mockOtherUser,
        timestamp: new Date("2024-01-01T15:30:00Z"),
        isUser: false,
      };

      render(
        <TelegramMessage
          message={otherImageMessage}
          showTimestamp
        />
      );

      const image = screen.getByAltText("Another test image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/test-image2.jpg");
    });
  });

  describe("timestamp formatting", () => {
    it("formats different times correctly", () => {
      const morningMessage: Message = {
        id: "5",
        type: "text",
        content: "Good morning!",
        sender: mockCurrentUser,
        timestamp: new Date("2024-01-01T09:05:00Z"),
        isUser: true,
      };

      render(
        <TelegramMessage
          message={morningMessage}
          showTimestamp
        />
      );

      expect(screen.getByText("9:05 AM")).toBeInTheDocument();
    });

    it("handles evening times correctly", () => {
      const eveningMessage: Message = {
        id: "6",
        type: "text",
        content: "Good evening!",
        sender: mockCurrentUser,
        timestamp: new Date("2024-01-01T21:30:00Z"),
        isUser: true,
      };

      render(
        <TelegramMessage
          message={eveningMessage}
          showTimestamp
        />
      );

      expect(screen.getByText("9:30 PM")).toBeInTheDocument();
    });
  });

  describe("message layout", () => {
    it("aligns user messages to the right", () => {
      const userMessage: Message = {
        id: "7",
        type: "text",
        content: "Right aligned message",
        sender: mockCurrentUser,
        timestamp: new Date("2024-01-01T15:20:00Z"),
        isUser: true,
      };

      render(
        <TelegramMessage
          message={userMessage}
          showTimestamp
        />
      );

      const container = screen.getByText("Right aligned message").closest('div');
      expect(container).toHaveClass('justify-end');
    });

    it("aligns other user messages to the left", () => {
      const otherMessage: Message = {
        id: "8",
        type: "text",
        content: "Left aligned message",
        sender: mockOtherUser,
        timestamp: new Date("2024-01-01T15:20:00Z"),
        isUser: false,
      };

      render(
        <TelegramMessage
          message={otherMessage}
          showTimestamp
        />
      );

      const container = screen.getByText("Left aligned message").closest('div');
      expect(container).toHaveClass('justify-start');
    });
  });
});