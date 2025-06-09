import { describe, it, expect, beforeEach, vi } from "bun:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppleMessageChat } from "./AppleMessageChat";
import { ChatProvider } from "@/contexts/ChatContext";
import type { User, Message } from "./types";

describe("AppleMessageChat", () => {
  const mockCurrentUser: User = {
    id: "user1",
    name: "John",
    avatar: "avatar1.jpg",
  };

  const mockOtherUser: User = {
    id: "user2",
    name: "윤경",
    avatar: "avatar2.jpg",
  };

  const mockMessages: Message[] = [
    {
      id: "1",
      type: "text",
      content: "이쪽 메일이나 주소로 보내주세요^^",
      sender: mockOtherUser,
      timestamp: new Date("2024-02-22T10:00:00"),
      isUser: false,
    },
    {
      id: "2",
      type: "text",
      content: "감사합니다! 확인해보고 문제 있으면 알려드릴께요 즐거운 주말 보내세요!",
      sender: mockCurrentUser,
      timestamp: new Date("2024-02-22T10:05:00"),
      isUser: true,
    },
  ];

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(
      <ChatProvider
        currentUser={mockCurrentUser}
        otherUser={mockOtherUser}
        initialMessages={mockMessages}
      >
        {ui}
      </ChatProvider>
    );
  };

  it("renders Apple Messages interface with correct dimensions", () => {
    renderWithProvider(<AppleMessageChat />);
    
    const chatContainer = screen.getByTestId("apple-message-chat");
    expect(chatContainer).toBeInTheDocument();
    expect(chatContainer).toHaveClass("w-[375px]", "h-[844px]");
  });

  it("displays Apple-style status bar", () => {
    renderWithProvider(<AppleMessageChat />);
    
    expect(screen.getByTestId("apple-status-bar")).toBeInTheDocument();
    expect(screen.getByText(/^\d{1,2}:\d{2}$/)).toBeInTheDocument(); // Time
  });

  it("shows contact header with back button", () => {
    renderWithProvider(<AppleMessageChat />);
    
    const header = screen.getByTestId("apple-header");
    expect(header).toBeInTheDocument();
    expect(screen.getByLabelText("Back")).toBeInTheDocument();
  });

  it("displays SMS input field with microphone icon", () => {
    renderWithProvider(<AppleMessageChat />);
    
    const input = screen.getByTestId("apple-input");
    expect(input).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Text Message/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Voice message")).toBeInTheDocument();
  });

  it("can export chat as image", async () => {
    const onExport = vi.fn();
    renderWithProvider(<AppleMessageChat onExport={onExport} />);
    
    const exportButton = screen.getByRole("button", { name: /export/i });
    await userEvent.click(exportButton);
    
    expect(onExport).toHaveBeenCalled();
  });
});