import { describe, expect, it } from "bun:test";
import { DiscordChatProps, DiscordMessageProps, DiscordHeaderProps, DiscordInputProps } from "./discord-types";
import { Message, User } from "./types";

const mockUser: User = {
  id: "user1",
  name: "TestUser",
  avatar: "avatar.jpg",
};

const mockMessage: Message = {
  id: "1",
  type: "text",
  content: "Test message",
  sender: mockUser,
  timestamp: new Date(),
  isUser: true,
};

describe("Discord Types", () => {
  describe("DiscordChatProps", () => {
    it("should have required properties", () => {
      const props: DiscordChatProps = {
        messages: [mockMessage],
        channelName: "general",
        serverName: "Test Server",
      };

      expect(props.messages).toBeDefined();
      expect(props.channelName).toBe("general");
      expect(props.serverName).toBe("Test Server");
    });

    it("should support optional className", () => {
      const props: DiscordChatProps = {
        messages: [mockMessage],
        channelName: "general", 
        serverName: "Test Server",
        className: "custom-class",
      };

      expect(props.className).toBe("custom-class");
    });
  });

  describe("DiscordMessageProps", () => {
    it("should have required message property", () => {
      const props: DiscordMessageProps = {
        message: mockMessage,
      };

      expect(props.message).toBeDefined();
    });

    it("should support optional display flags", () => {
      const props: DiscordMessageProps = {
        message: mockMessage,
        showSenderInfo: true,
        showTimestamp: false,
      };

      expect(props.showSenderInfo).toBe(true);
      expect(props.showTimestamp).toBe(false);
    });
  });

  describe("DiscordHeaderProps", () => {
    it("should have required channel and server names", () => {
      const props: DiscordHeaderProps = {
        channelName: "general",
        serverName: "Test Server",
      };

      expect(props.channelName).toBe("general");
      expect(props.serverName).toBe("Test Server");
    });

    it("should support optional member count", () => {
      const props: DiscordHeaderProps = {
        channelName: "general",
        serverName: "Test Server", 
        memberCount: 42,
      };

      expect(props.memberCount).toBe(42);
    });
  });

  describe("DiscordInputProps", () => {
    it("should have required channel name", () => {
      const props: DiscordInputProps = {
        channelName: "general",
      };

      expect(props.channelName).toBe("general");
    });

    it("should support optional callbacks and placeholder", () => {
      const mockCallback = () => {};
      
      const props: DiscordInputProps = {
        channelName: "general",
        onSendMessage: mockCallback,
        onAttach: mockCallback,
        onEmoji: mockCallback,
        placeholder: "Custom placeholder",
      };

      expect(props.onSendMessage).toBeDefined();
      expect(props.onAttach).toBeDefined();
      expect(props.onEmoji).toBeDefined();
      expect(props.placeholder).toBe("Custom placeholder");
    });
  });
});