import { render, screen, act } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { ChatProvider, useChatContext } from "./ChatContext";
import { User, Message } from "@/components/kakao/types";

// Mock users for testing
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

// Mock initial messages
const mockInitialMessages: Message[] = [
  {
    id: "1",
    type: "text",
    content: "Hello!",
    sender: mockCurrentUser,
    timestamp: new Date("2024-01-01T10:00:00Z"),
    isUser: true,
  },
  {
    id: "2",
    type: "image",
    imageUrl: "test-image.jpg",
    alt: "Test image",
    sender: mockOtherUser,
    timestamp: new Date("2024-01-01T10:05:00Z"),
    isUser: false,
  },
];

// Test component to consume context
function TestComponent() {
  const {
    messages,
    currentUser,
    otherUser,
    addMessage,
    editMessage,
    deleteMessage,
    clearMessages,
    updateUsers,
  } = useChatContext();

  return (
    <div>
      <div data-testid="messages-count">{messages.length}</div>
      <div data-testid="current-user">{currentUser.name}</div>
      <div data-testid="other-user">{otherUser.name}</div>
      <button
        data-testid="add-text-message"
        onClick={() =>
          addMessage({
            type: "text",
            content: "New message",
            isUserMessage: true,
            hour: 12,
            minute: 30,
          })
        }
      >
        Add Text Message
      </button>
      <button
        data-testid="add-image-message"
        onClick={() =>
          addMessage({
            type: "image",
            imageUrl: "new-image.jpg",
            imageAlt: "New image",
            isUserMessage: false,
            hour: 13,
            minute: 45,
          })
        }
      >
        Add Image Message
      </button>
      <button
        data-testid="edit-message"
        onClick={() =>
          editMessage("1", {
            content: "Updated message",
            hour: 14,
            minute: 15,
          })
        }
      >
        Edit Message
      </button>
      <button
        data-testid="delete-message"
        onClick={() => deleteMessage("1")}
      >
        Delete Message
      </button>
      <button
        data-testid="clear-messages"
        onClick={() => clearMessages()}
      >
        Clear Messages
      </button>
      <button
        data-testid="update-users"
        onClick={() =>
          updateUsers(
            { id: "new-current", name: "New Current User", avatar: "new-avatar1.jpg" },
            { id: "new-other", name: "New Other User", avatar: "new-avatar2.jpg" }
          )
        }
      >
        Update Users
      </button>
    </div>
  );
}

// Component to test hook error handling
function TestComponentWithoutProvider() {
  const context = useChatContext();
  return <div>{context.currentUser.name}</div>;
}

describe("ChatContext", () => {
  describe("Provider", () => {
    it("provides context values correctly", () => {
      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
          initialMessages={mockInitialMessages}
        >
          <TestComponent />
        </ChatProvider>
      );

      expect(screen.getByTestId("messages-count")).toHaveTextContent("2");
      expect(screen.getByTestId("current-user")).toHaveTextContent(
        "Current User"
      );
      expect(screen.getByTestId("other-user")).toHaveTextContent("Other User");
    });

    it("initializes with empty messages when no initialMessages provided", () => {
      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestComponent />
        </ChatProvider>
      );

      expect(screen.getByTestId("messages-count")).toHaveTextContent("0");
    });
  });

  describe("useChatContext hook", () => {
    it("throws error when used outside provider", () => {
      expect(() => {
        render(<TestComponentWithoutProvider />);
      }).toThrow("useChatContext must be used within a ChatProvider");
    });
  });

  describe("addMessage", () => {
    it("adds a text message correctly", () => {
      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestComponent />
        </ChatProvider>
      );

      expect(screen.getByTestId("messages-count")).toHaveTextContent("0");

      act(() => {
        screen.getByTestId("add-text-message").click();
      });

      expect(screen.getByTestId("messages-count")).toHaveTextContent("1");
    });

    it("adds an image message correctly", () => {
      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestComponent />
        </ChatProvider>
      );

      expect(screen.getByTestId("messages-count")).toHaveTextContent("0");

      act(() => {
        screen.getByTestId("add-image-message").click();
      });

      expect(screen.getByTestId("messages-count")).toHaveTextContent("1");
    });

    it("sets correct sender based on isUserMessage flag", () => {
      let capturedMessages: Message[] = [];

      function TestAddMessage() {
        const { messages, addMessage } = useChatContext();
        capturedMessages = messages;

        return (
          <button
            onClick={() =>
              addMessage({
                type: "text",
                content: "Test",
                isUserMessage: true,
                hour: 10,
                minute: 0,
              })
            }
          >
            Add
          </button>
        );
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestAddMessage />
        </ChatProvider>
      );

      act(() => {
        screen.getByRole("button").click();
      });

      expect(capturedMessages[0].sender).toEqual(mockCurrentUser);
      expect(capturedMessages[0].isUser).toBe(true);
    });

    it("creates correct timestamp from hour and minute", () => {
      let capturedMessages: Message[] = [];

      function TestTimestamp() {
        const { messages, addMessage } = useChatContext();
        capturedMessages = messages;

        return (
          <button
            onClick={() =>
              addMessage({
                type: "text",
                content: "Test",
                isUserMessage: true,
                hour: 15,
                minute: 30,
              })
            }
          >
            Add
          </button>
        );
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestTimestamp />
        </ChatProvider>
      );

      act(() => {
        screen.getByRole("button").click();
      });

      const timestamp = capturedMessages[0].timestamp;
      expect(timestamp.getHours()).toBe(15);
      expect(timestamp.getMinutes()).toBe(30);
    });
  });

  describe("editMessage", () => {
    it("updates message content", () => {
      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
          initialMessages={mockInitialMessages}
        >
          <TestComponent />
        </ChatProvider>
      );

      act(() => {
        screen.getByTestId("edit-message").click();
      });

      // Message count should remain the same
      expect(screen.getByTestId("messages-count")).toHaveTextContent("2");
    });

    it("updates message timestamp when hour/minute provided", () => {
      let capturedMessages: Message[] = [];

      function TestEditTimestamp() {
        const { messages, editMessage } = useChatContext();
        capturedMessages = messages;

        return (
          <button
            onClick={() =>
              editMessage("1", {
                hour: 16,
                minute: 45,
              })
            }
          >
            Edit
          </button>
        );
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
          initialMessages={mockInitialMessages}
        >
          <TestEditTimestamp />
        </ChatProvider>
      );

      act(() => {
        screen.getByRole("button").click();
      });

      const editedMessage = capturedMessages.find((m) => m.id === "1");
      expect(editedMessage?.timestamp.getHours()).toBe(16);
      expect(editedMessage?.timestamp.getMinutes()).toBe(45);
    });

    it("updates sender when isUserMessage changes", () => {
      let capturedMessages: Message[] = [];

      function TestEditSender() {
        const { messages, editMessage } = useChatContext();
        capturedMessages = messages;

        return (
          <button
            onClick={() =>
              editMessage("1", {
                isUserMessage: false,
              })
            }
          >
            Edit
          </button>
        );
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
          initialMessages={mockInitialMessages}
        >
          <TestEditSender />
        </ChatProvider>
      );

      act(() => {
        screen.getByRole("button").click();
      });

      const editedMessage = capturedMessages.find((m) => m.id === "1");
      expect(editedMessage?.sender).toEqual(mockOtherUser);
      expect(editedMessage?.isUser).toBe(false);
    });
  });

  describe("deleteMessage", () => {
    it("removes message with specified id", () => {
      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
          initialMessages={mockInitialMessages}
        >
          <TestComponent />
        </ChatProvider>
      );

      expect(screen.getByTestId("messages-count")).toHaveTextContent("2");

      act(() => {
        screen.getByTestId("delete-message").click();
      });

      expect(screen.getByTestId("messages-count")).toHaveTextContent("1");
    });

    it("does not affect other messages", () => {
      let capturedMessages: Message[] = [];

      function TestDelete() {
        const { messages, deleteMessage } = useChatContext();
        capturedMessages = messages;

        return <button onClick={() => deleteMessage("1")}>Delete</button>;
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
          initialMessages={mockInitialMessages}
        >
          <TestDelete />
        </ChatProvider>
      );

      act(() => {
        screen.getByRole("button").click();
      });

      expect(capturedMessages).toHaveLength(1);
      expect(capturedMessages[0].id).toBe("2");
    });
  });

  describe("clearMessages", () => {
    it("removes all messages", () => {
      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
          initialMessages={mockInitialMessages}
        >
          <TestComponent />
        </ChatProvider>
      );

      expect(screen.getByTestId("messages-count")).toHaveTextContent("2");

      act(() => {
        screen.getByTestId("clear-messages").click();
      });

      expect(screen.getByTestId("messages-count")).toHaveTextContent("0");
    });
  });

  describe("updateUsers", () => {
    it("updates currentUser and otherUser correctly", () => {
      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestComponent />
        </ChatProvider>
      );

      expect(screen.getByTestId("current-user")).toHaveTextContent("Current User");
      expect(screen.getByTestId("other-user")).toHaveTextContent("Other User");

      act(() => {
        screen.getByTestId("update-users").click();
      });

      expect(screen.getByTestId("current-user")).toHaveTextContent("New Current User");
      expect(screen.getByTestId("other-user")).toHaveTextContent("New Other User");
    });

    it("updates existing message senders when users are updated", () => {
      let capturedMessages: Message[] = [];

      function TestUpdateUsersWithMessages() {
        const { messages, addMessage, updateUsers } = useChatContext();
        capturedMessages = messages;

        return (
          <div>
            <button
              data-testid="add-message"
              onClick={() =>
                addMessage({
                  type: "text",
                  content: "Test message",
                  isUserMessage: true,
                  hour: 10,
                  minute: 0,
                })
              }
            >
              Add Message
            </button>
            <button
              data-testid="update-users"
              onClick={() =>
                updateUsers(
                  { id: "updated-current", name: "Updated Current", avatar: "updated1.jpg" },
                  { id: "updated-other", name: "Updated Other", avatar: "updated2.jpg" }
                )
              }
            >
              Update Users
            </button>
          </div>
        );
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestUpdateUsersWithMessages />
        </ChatProvider>
      );

      // Add a message first
      act(() => {
        screen.getByTestId("add-message").click();
      });

      expect(capturedMessages[0].sender.name).toBe("Current User");

      // Update users
      act(() => {
        screen.getByTestId("update-users").click();
      });

      // Check that the message sender was updated
      expect(capturedMessages[0].sender.name).toBe("Updated Current");
      expect(capturedMessages[0].sender.id).toBe("updated-current");
    });

    it("correctly maps message senders based on isUser flag", () => {
      let capturedMessages: Message[] = [];

      function TestMixedMessages() {
        const { messages, addMessage, updateUsers } = useChatContext();
        capturedMessages = messages;

        return (
          <div>
            <button
              data-testid="add-user-message"
              onClick={() =>
                addMessage({
                  type: "text",
                  content: "User message",
                  isUserMessage: true,
                  hour: 10,
                  minute: 0,
                })
              }
            >
              Add User Message
            </button>
            <button
              data-testid="add-other-message"
              onClick={() =>
                addMessage({
                  type: "text",
                  content: "Other message",
                  isUserMessage: false,
                  hour: 10,
                  minute: 5,
                })
              }
            >
              Add Other Message
            </button>
            <button
              data-testid="update-users"
              onClick={() =>
                updateUsers(
                  { id: "new-user", name: "New User", avatar: "new1.jpg" },
                  { id: "new-other", name: "New Other", avatar: "new2.jpg" }
                )
              }
            >
              Update Users
            </button>
          </div>
        );
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestMixedMessages />
        </ChatProvider>
      );

      // Add messages from both users
      act(() => {
        screen.getByTestId("add-user-message").click();
        screen.getByTestId("add-other-message").click();
      });

      expect(capturedMessages[0].sender.name).toBe("Current User");
      expect(capturedMessages[1].sender.name).toBe("Other User");

      // Update users
      act(() => {
        screen.getByTestId("update-users").click();
      });

      // Check that both message senders were updated correctly
      expect(capturedMessages[0].sender.name).toBe("New User"); // isUser: true
      expect(capturedMessages[1].sender.name).toBe("New Other"); // isUser: false
    });
  });
});
