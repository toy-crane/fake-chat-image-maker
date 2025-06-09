import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { InstagramMessage } from "./InstagramMessage";
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

const mockTextMessage: Message = {
  id: "1",
  type: "text",
  content: "Hello Instagram!",
  sender: mockCurrentUser,
  timestamp: new Date("2024-01-01T10:00:00Z"),
  isUser: true,
};

const mockImageMessage: Message = {
  id: "2",
  type: "image", 
  imageUrl: "test-image.jpg",
  alt: "Test image",
  sender: mockOtherUser,
  timestamp: new Date("2024-01-01T10:05:00Z"),
  isUser: false,
};

const mockOtherTextMessage: Message = {
  id: "3",
  type: "text",
  content: "Hey there!",
  sender: mockOtherUser,
  timestamp: new Date("2024-01-01T10:10:00Z"),
  isUser: false,
};

describe("InstagramMessage", () => {
  describe("User Messages (Right Side)", () => {
    it("renders user text message with blue gradient bubble", () => {
      render(
        <InstagramMessage
          message={mockTextMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const messageContainer = screen.getByTestId(`instagram-message-${mockTextMessage.id}`);
      expect(messageContainer).toBeInTheDocument();
      expect(messageContainer).toHaveClass("justify-end"); // Right aligned

      const bubble = screen.getByTestId("message-bubble");
      expect(bubble).toHaveClass("bg-gradient-to-r");
      expect(bubble).toHaveClass("from-blue-500");
      expect(bubble).toHaveClass("to-purple-600");
      expect(screen.getByText("Hello Instagram!")).toBeInTheDocument();
    });

    it("renders user image message", () => {
      const userImageMessage = { ...mockImageMessage, isUser: true, sender: mockCurrentUser };
      render(
        <InstagramMessage
          message={userImageMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const messageContainer = screen.getByTestId(`instagram-message-${userImageMessage.id}`);
      expect(messageContainer).toHaveClass("justify-end");

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", "test-image.jpg");
      expect(image).toHaveAttribute("alt", "Test image");
    });

    it("shows timestamp for user messages on left side", () => {
      render(
        <InstagramMessage
          message={mockTextMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const timestamp = screen.getByTestId("message-timestamp");
      expect(timestamp).toBeInTheDocument();
      expect(timestamp).toHaveTextContent("10:00 AM");
    });

    it("hides timestamp when showTimestamp is false", () => {
      render(
        <InstagramMessage
          message={mockTextMessage}
          showSenderInfo={true}
          showTimestamp={false}
        />
      );

      expect(screen.queryByTestId("message-timestamp")).not.toBeInTheDocument();
    });
  });

  describe("Other User Messages (Left Side)", () => {
    it("renders other user text message with dark gray bubble", () => {
      render(
        <InstagramMessage
          message={mockOtherTextMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const messageContainer = screen.getByTestId(`instagram-message-${mockOtherTextMessage.id}`);
      expect(messageContainer).toHaveClass("justify-start"); // Left aligned

      const bubble = screen.getByTestId("message-bubble");
      expect(bubble).toHaveClass("bg-gray-700");
      expect(screen.getByText("Hey there!")).toBeInTheDocument();
    });

    it("shows avatar when showSenderInfo is true", () => {
      render(
        <InstagramMessage
          message={mockOtherTextMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const avatar = screen.getByTestId("sender-avatar");
      expect(avatar).toBeInTheDocument();
    });

    it("hides avatar when showSenderInfo is false", () => {
      render(
        <InstagramMessage
          message={mockOtherTextMessage}
          showSenderInfo={false}
          showTimestamp={true}
        />
      );

      expect(screen.queryByTestId("sender-avatar")).not.toBeInTheDocument();
      // Should still have spacing div
      expect(screen.getByTestId("avatar-spacer")).toBeInTheDocument();
    });

    it("renders other user image message", () => {
      render(
        <InstagramMessage
          message={mockImageMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", "test-image.jpg");
      expect(image).toHaveAttribute("alt", "Test image");
    });

    it("shows timestamp for other messages on right side", () => {
      render(
        <InstagramMessage
          message={mockOtherTextMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const timestamp = screen.getByTestId("message-timestamp");
      expect(timestamp).toBeInTheDocument();
      expect(timestamp).toHaveTextContent("10:10 AM");
    });
  });

  describe("Message Styling", () => {
    it("applies white text color to user messages", () => {
      render(
        <InstagramMessage
          message={mockTextMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const content = screen.getByText("Hello Instagram!");
      expect(content).toHaveClass("text-white");
    });

    it("applies light gray text color to other user messages", () => {
      render(
        <InstagramMessage
          message={mockOtherTextMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const content = screen.getByText("Hey there!");
      expect(content).toHaveClass("text-gray-100");
    });

    it("has proper rounded corners for message bubbles", () => {
      render(
        <InstagramMessage
          message={mockTextMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const bubble = screen.getByTestId("message-bubble");
      expect(bubble).toHaveClass("rounded-2xl");
    });

    it("handles long messages with proper max width", () => {
      const longMessage = { 
        ...mockTextMessage, 
        content: "This is a very long message that should wrap properly and not exceed the maximum width constraints of the Instagram DM interface."
      };

      render(
        <InstagramMessage
          message={longMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const bubble = screen.getByTestId("message-bubble");
      expect(bubble).toHaveClass("max-w-xs");
    });
  });

  describe("Timestamp Formatting", () => {
    it("formats timestamp correctly for AM time", () => {
      render(
        <InstagramMessage
          message={mockTextMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const timestamp = screen.getByTestId("message-timestamp");
      expect(timestamp).toHaveTextContent("10:00 AM");
    });

    it("formats timestamp correctly for PM time", () => {
      const pmMessage = {
        ...mockTextMessage,
        timestamp: new Date("2024-01-01T15:30:00Z"),
      };

      render(
        <InstagramMessage
          message={pmMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const timestamp = screen.getByTestId("message-timestamp");
      expect(timestamp).toHaveTextContent("3:30 PM");
    });

    it("has dark gray timestamp color", () => {
      render(
        <InstagramMessage
          message={mockTextMessage}
          showSenderInfo={true}
          showTimestamp={true}
        />
      );

      const timestamp = screen.getByTestId("message-timestamp");
      expect(timestamp).toHaveClass("text-gray-400");
    });
  });
});