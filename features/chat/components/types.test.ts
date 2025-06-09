import { describe, expect, it } from "bun:test";
import { 
  User, 
  Message, 
  TextMessage, 
  ImageMessage,
  InstagramDMChatProps,
  InstagramHeaderProps,
  InstagramMessageProps,
  ChatMode
} from "./types";

describe("Types", () => {
  describe("User interface", () => {
    it("has correct properties", () => {
      const user: User = {
        id: "user1",
        name: "Test User",
        avatar: "avatar.jpg"
      };

      expect(user.id).toBe("user1");
      expect(user.name).toBe("Test User");
      expect(user.avatar).toBe("avatar.jpg");
    });

    it("allows optional name and avatar", () => {
      const minimalUser: User = {
        id: "user1"
      };

      expect(minimalUser.id).toBe("user1");
      expect(minimalUser.name).toBeUndefined();
      expect(minimalUser.avatar).toBeUndefined();
    });
  });

  describe("TextMessage interface", () => {
    it("has correct properties", () => {
      const user: User = { id: "user1", name: "Test" };
      const textMessage: TextMessage = {
        id: "msg1",
        type: "text",
        content: "Hello world",
        sender: user,
        timestamp: new Date(),
        isUser: true
      };

      expect(textMessage.type).toBe("text");
      expect(textMessage.content).toBe("Hello world");
      expect(textMessage.sender).toBe(user);
      expect(textMessage.isUser).toBe(true);
    });
  });

  describe("ImageMessage interface", () => {
    it("has correct properties", () => {
      const user: User = { id: "user1", name: "Test" };
      const imageMessage: ImageMessage = {
        id: "msg1",
        type: "image",
        imageUrl: "image.jpg",
        alt: "Test image",
        sender: user,
        timestamp: new Date(),
        isUser: false
      };

      expect(imageMessage.type).toBe("image");
      expect(imageMessage.imageUrl).toBe("image.jpg");
      expect(imageMessage.alt).toBe("Test image");
      expect(imageMessage.isUser).toBe(false);
    });
  });

  describe("Message union type", () => {
    it("accepts both text and image messages", () => {
      const user: User = { id: "user1", name: "Test" };
      
      const messages: Message[] = [
        {
          id: "1",
          type: "text",
          content: "Hello",
          sender: user,
          timestamp: new Date(),
          isUser: true
        },
        {
          id: "2", 
          type: "image",
          imageUrl: "image.jpg",
          alt: "Image",
          sender: user,
          timestamp: new Date(),
          isUser: false
        }
      ];

      expect(messages).toHaveLength(2);
      expect(messages[0].type).toBe("text");
      expect(messages[1].type).toBe("image");
    });
  });

  describe("ChatMode type", () => {
    it("accepts valid chat modes", () => {
      const kakaoMode: ChatMode = "kakaotalk";
      const instagramMode: ChatMode = "instagram";

      expect(kakaoMode).toBe("kakaotalk");
      expect(instagramMode).toBe("instagram");
    });
  });

  describe("InstagramDMChatProps interface", () => {
    it("has correct properties", () => {
      const user: User = { id: "user1", name: "Test" };
      const messages: Message[] = [{
        id: "1",
        type: "text", 
        content: "Test",
        sender: user,
        timestamp: new Date(),
        isUser: true
      }];

      const props: InstagramDMChatProps = {
        messages,
        chatTitle: "Test Chat",
        className: "custom-class"
      };

      expect(props.messages).toBe(messages);
      expect(props.chatTitle).toBe("Test Chat");
      expect(props.className).toBe("custom-class");
    });

    it("allows optional className", () => {
      const user: User = { id: "user1", name: "Test" };
      const messages: Message[] = [{
        id: "1",
        type: "text",
        content: "Test", 
        sender: user,
        timestamp: new Date(),
        isUser: true
      }];

      const props: InstagramDMChatProps = {
        messages,
        chatTitle: "Test Chat"
      };

      expect(props.className).toBeUndefined();
    });
  });

  describe("InstagramHeaderProps interface", () => {
    it("has correct properties", () => {
      const props: InstagramHeaderProps = {
        title: "Test User"
      };

      expect(props.title).toBe("Test User");
    });
  });

  describe("InstagramMessageProps interface", () => {
    it("has correct properties", () => {
      const user: User = { id: "user1", name: "Test" };
      const message: Message = {
        id: "1",
        type: "text",
        content: "Test",
        sender: user,
        timestamp: new Date(),
        isUser: true
      };

      const props: InstagramMessageProps = {
        message,
        showSenderInfo: true,
        showTimestamp: false
      };

      expect(props.message).toBe(message);
      expect(props.showSenderInfo).toBe(true);
      expect(props.showTimestamp).toBe(false);
    });

    it("allows optional showSenderInfo and showTimestamp", () => {
      const user: User = { id: "user1", name: "Test" };
      const message: Message = {
        id: "1",
        type: "text",
        content: "Test",
        sender: user,
        timestamp: new Date(),
        isUser: true
      };

      const props: InstagramMessageProps = {
        message
      };

      expect(props.showSenderInfo).toBeUndefined();
      expect(props.showTimestamp).toBeUndefined();
    });
  });
});