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
      <div data-testid="current-user">{currentUser?.name}</div>
      <div data-testid="other-user">{otherUser?.name}</div>
      <button
        data-testid="add-text-message"
        onClick={() =>
          addMessage({
            type: "text",
            content: "New message",
            isUserMessage: true,
            time: "12:30",
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
            time: "13:45",
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
            time: "14:15",
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
  return <div>{context.currentUser?.name}</div>;
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
                time: "10:00",
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
                time: "15:30",
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
                time: "16:45",
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

  describe("addBulkMessages", () => {
    it("adds multiple messages at once", () => {
      let capturedMessages: Message[] = [];

      function TestBulkAdd() {
        const { messages, addBulkMessages } = useChatContext();
        capturedMessages = messages;

        const bulkData = [
          {
            type: "text" as const,
            content: "First message",
            isUserMessage: true,
            time: "10:00"
          },
          {
            type: "image" as const,
            imageUrl: "test-image.jpg",
            imageAlt: "Test image",
            isUserMessage: false,
            time: "10:05"
          },
          {
            type: "text" as const,
            content: "Third message",
            isUserMessage: true,
            time: "10:10"
          },
        ];

        return (
          <button onClick={() => addBulkMessages(bulkData)}>
            Add Bulk Messages
          </button>
        );
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestBulkAdd />
        </ChatProvider>
      );

      act(() => {
        screen.getByRole("button").click();
      });

      expect(capturedMessages).toHaveLength(3);
      expect(capturedMessages[0].type).toBe("text");
      expect(capturedMessages[1].type).toBe("image");
      expect(capturedMessages[2].type).toBe("text");
    });

    it("preserves message order from input array", () => {
      let capturedMessages: Message[] = [];

      function TestBulkOrder() {
        const { messages, addBulkMessages } = useChatContext();
        capturedMessages = messages;

        const bulkData = [
          {
            type: "text" as const,
            content: "Message A",
            isUserMessage: true,
            time: "10:00"
          },
          {
            type: "text" as const,
            content: "Message B",
            isUserMessage: false,
            time: "10:05"
          },
          {
            type: "text" as const,
            content: "Message C",
            isUserMessage: true,
            time: "10:10"
          },
        ];

        return (
          <button onClick={() => addBulkMessages(bulkData)}>
            Add Bulk Messages
          </button>
        );
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestBulkOrder />
        </ChatProvider>
      );

      act(() => {
        screen.getByRole("button").click();
      });

      expect(capturedMessages[0].type).toBe("text");
      expect((capturedMessages[0] as { content: string }).content).toBe("Message A");
      expect(capturedMessages[1].type).toBe("text");
      expect((capturedMessages[1] as { content: string }).content).toBe("Message B");
      expect(capturedMessages[2].type).toBe("text");
      expect((capturedMessages[2] as { content: string }).content).toBe("Message C");
    });

    it("assigns correct timestamps and senders for bulk messages", () => {
      let capturedMessages: Message[] = [];

      function TestBulkTimestampsAndSenders() {
        const { messages, addBulkMessages } = useChatContext();
        capturedMessages = messages;

        const bulkData = [
          {
            type: "text" as const,
            content: "User message",
            isUserMessage: true,
            time: "14:30",
          },
          {
            type: "text" as const,
            content: "Other message",
            isUserMessage: false,
            time: "15:45",
          },
        ];

        return (
          <button onClick={() => addBulkMessages(bulkData)}>
            Add Bulk Messages
          </button>
        );
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestBulkTimestampsAndSenders />
        </ChatProvider>
      );

      act(() => {
        screen.getByRole("button").click();
      });

      // Check first message
      expect(capturedMessages[0].timestamp.getHours()).toBe(14);
      expect(capturedMessages[0].timestamp.getMinutes()).toBe(30);
      expect(capturedMessages[0].sender).toEqual(mockCurrentUser);
      expect(capturedMessages[0].isUser).toBe(true);

      // Check second message
      expect(capturedMessages[1].timestamp.getHours()).toBe(15);
      expect(capturedMessages[1].timestamp.getMinutes()).toBe(45);
      expect(capturedMessages[1].sender).toEqual(mockOtherUser);
      expect(capturedMessages[1].isUser).toBe(false);
    });

    it("does nothing with empty array", () => {
      let capturedMessages: Message[] = [];

      function TestEmptyBulk() {
        const { messages, addBulkMessages } = useChatContext();
        capturedMessages = messages;

        return (
          <button onClick={() => addBulkMessages([])}>
            Add Empty Bulk
          </button>
        );
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestEmptyBulk />
        </ChatProvider>
      );

      act(() => {
        screen.getByRole("button").click();
      });

      expect(capturedMessages).toHaveLength(0);
    });

    it("appends to existing messages", () => {
      let capturedMessages: Message[] = [];

      function TestAppendBulk() {
        const { messages, addMessage, addBulkMessages } = useChatContext();
        capturedMessages = messages;

        const bulkData = [
          {
            type: "text" as const,
            content: "Bulk message 1",
            isUserMessage: true,
            time: "11:00",
          },
          {
            type: "text" as const,
            content: "Bulk message 2",
            isUserMessage: false,
            time: "11:05",
          },
        ];

        return (
          <div>
            <button
              data-testid="add-single"
              onClick={() =>
                addMessage({
                  type: "text",
                  content: "Single message",
                  isUserMessage: true,
                  time: "10:00"
                })
              }
            >
              Add Single
            </button>
            <button
              data-testid="add-bulk"
              onClick={() => addBulkMessages(bulkData)}
            >
              Add Bulk
            </button>
          </div>
        );
      }

      render(
        <ChatProvider
          currentUser={mockCurrentUser}
          otherUser={mockOtherUser}
        >
          <TestAppendBulk />
        </ChatProvider>
      );

      // Add single message first
      act(() => {
        screen.getByTestId("add-single").click();
      });

      expect(capturedMessages).toHaveLength(1);

      // Add bulk messages
      act(() => {
        screen.getByTestId("add-bulk").click();
      });

      expect(capturedMessages).toHaveLength(3);
      expect((capturedMessages[0] as { content: string }).content).toBe("Single message");
      expect((capturedMessages[1] as { content: string }).content).toBe("Bulk message 1");
      expect((capturedMessages[2] as { content: string }).content).toBe("Bulk message 2");
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
                  time: "10:00"
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
                  time: "10:00"
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
                  time: "10:05"
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
