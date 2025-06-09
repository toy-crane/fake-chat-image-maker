import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { DiscordMessage } from "./DiscordMessage";
import { Message, User } from "./types";

const mockUser: User = {
  id: "user1",
  name: "TestUser",
  avatar: "avatar.jpg",
};

const mockTextMessage: Message = {
  id: "1",
  type: "text",
  content: "Hello Discord!",
  sender: mockUser,
  timestamp: new Date("2024-01-01T14:30:00Z"),
  isUser: true,
};

const mockImageMessage: Message = {
  id: "2", 
  type: "image",
  imageUrl: "test-image.jpg",
  alt: "Test image",
  sender: mockUser,
  timestamp: new Date("2024-01-01T15:00:00Z"),
  isUser: false,
};

describe("DiscordMessage", () => {
  describe("Text Messages", () => {
    it("renders text message content", () => {
      render(<DiscordMessage message={mockTextMessage} />);
      
      expect(screen.getByText("Hello Discord!")).toBeInTheDocument();
    });

    it("displays sender name when showSenderInfo is true", () => {
      render(<DiscordMessage message={mockTextMessage} showSenderInfo={true} />);
      
      expect(screen.getByText("TestUser")).toBeInTheDocument();
    });

    it("hides sender name when showSenderInfo is false", () => {
      render(<DiscordMessage message={mockTextMessage} showSenderInfo={false} />);
      
      expect(screen.queryByText("TestUser")).not.toBeInTheDocument();
    });

    it("displays timestamp when showTimestamp is true", () => {
      render(<DiscordMessage message={mockTextMessage} showTimestamp={true} />);
      
      expect(screen.getByText("2:30 PM")).toBeInTheDocument();
    });

    it("hides timestamp when showTimestamp is false", () => {
      render(<DiscordMessage message={mockTextMessage} showTimestamp={false} />);
      
      expect(screen.queryByText("2:30 PM")).not.toBeInTheDocument();
    });

    it("shows sender avatar when showSenderInfo is true", () => {
      render(<DiscordMessage message={mockTextMessage} showSenderInfo={true} />);
      
      const avatar = screen.getByRole("img", { name: /TestUser/i });
      expect(avatar).toBeInTheDocument();
    });
  });

  describe("Image Messages", () => {
    it("renders image message", () => {
      render(<DiscordMessage message={mockImageMessage} />);
      
      const image = screen.getByRole("img", { name: "Test image" });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "test-image.jpg");
    });

    it("displays sender info for image messages", () => {
      render(<DiscordMessage message={mockImageMessage} showSenderInfo={true} />);
      
      expect(screen.getByText("TestUser")).toBeInTheDocument();
    });
  });

  describe("Discord-specific styling", () => {
    it("applies Discord dark theme colors", () => {
      render(<DiscordMessage message={mockTextMessage} />);
      
      const messageContent = screen.getByText("Hello Discord!");
      expect(messageContent).toHaveClass("text-gray-100");
    });

    it("uses Discord-style message layout", () => {
      render(<DiscordMessage message={mockTextMessage} showSenderInfo={true} />);
      
      const messageContainer = screen.getByTestId("discord-message");
      expect(messageContainer).toHaveClass("flex", "gap-3", "px-4", "py-1");
    });

    it("shows role-based username color", () => {
      render(<DiscordMessage message={mockTextMessage} showSenderInfo={true} />);
      
      const username = screen.getByText("TestUser");
      expect(username).toHaveClass("text-blue-400");
    });
  });

  describe("Message grouping", () => {
    it("applies compact layout when showSenderInfo is false", () => {
      render(<DiscordMessage message={mockTextMessage} showSenderInfo={false} />);
      
      const messageContainer = screen.getByTestId("discord-message");
      expect(messageContainer).toHaveClass("ml-12");
    });

    it("applies full layout when showSenderInfo is true", () => {
      render(<DiscordMessage message={mockTextMessage} showSenderInfo={true} />);
      
      const messageContainer = screen.getByTestId("discord-message");
      expect(messageContainer).not.toHaveClass("ml-12");
    });
  });
});