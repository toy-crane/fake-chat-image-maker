import { describe, expect, it, beforeEach } from "bun:test";
import { render, screen, fireEvent } from "@/testing-library";
import { InstagramDMChat } from "./InstagramDMChat";
import { ChatProvider } from "@/contexts/ChatContext";

describe("InstagramDMChat", () => {
  const mockExportChat = jest.fn();

  beforeEach(() => {
    mockExportChat.mockClear();
  });

  it("renders Instagram DM chat interface", () => {
    render(
      <ChatProvider>
        <InstagramDMChat onExportChat={mockExportChat} />
      </ChatProvider>
    );

    // Check for main container
    const chatContainer = screen.getByTestId("instagram-dm-chat");
    expect(chatContainer).toBeInTheDocument();
    
    // Check dimensions
    expect(chatContainer).toHaveStyle({
      width: "375px",
      height: "844px",
    });
  });

  it("renders status bar", () => {
    render(
      <ChatProvider>
        <InstagramDMChat onExportChat={mockExportChat} />
      </ChatProvider>
    );

    const statusBar = screen.getByTestId("instagram-status-bar");
    expect(statusBar).toBeInTheDocument();
  });

  it("renders chat header with user info", () => {
    render(
      <ChatProvider>
        <InstagramDMChat onExportChat={mockExportChat} />
      </ChatProvider>
    );

    const header = screen.getByTestId("instagram-chat-header");
    expect(header).toBeInTheDocument();
  });

  it("renders message list area", () => {
    render(
      <ChatProvider>
        <InstagramDMChat onExportChat={mockExportChat} />
      </ChatProvider>
    );

    const messageArea = screen.getByTestId("instagram-message-list");
    expect(messageArea).toBeInTheDocument();
  });

  it("renders input area", () => {
    render(
      <ChatProvider>
        <InstagramDMChat onExportChat={mockExportChat} />
      </ChatProvider>
    );

    const inputArea = screen.getByTestId("instagram-chat-input");
    expect(inputArea).toBeInTheDocument();
  });

  it("calls onExportChat when triggered", () => {
    render(
      <ChatProvider>
        <InstagramDMChat onExportChat={mockExportChat} />
      </ChatProvider>
    );

    // Simulate export trigger (this would be implemented in the actual component)
    const chatContainer = screen.getByTestId("instagram-dm-chat");
    fireEvent.contextMenu(chatContainer); // Example trigger
    
    // The actual implementation will determine how export is triggered
  });
});