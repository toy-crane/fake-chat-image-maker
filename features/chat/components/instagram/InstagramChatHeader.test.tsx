import { describe, expect, it } from "bun:test";
import { render, screen, fireEvent } from "@/testing-library";
import { InstagramChatHeader } from "./InstagramChatHeader";

describe("InstagramChatHeader", () => {
  const mockUser = {
    id: "user1",
    name: "이동범",
    avatar: "https://example.com/avatar.jpg",
    username: "dongbumss",
  };

  const mockOnBack = jest.fn();
  const mockOnPhoneCall = jest.fn();
  const mockOnVideoCall = jest.fn();

  beforeEach(() => {
    mockOnBack.mockClear();
    mockOnPhoneCall.mockClear();
    mockOnVideoCall.mockClear();
  });

  it("renders header with user info", () => {
    render(
      <InstagramChatHeader
        user={mockUser}
        onBack={mockOnBack}
        onPhoneCall={mockOnPhoneCall}
        onVideoCall={mockOnVideoCall}
      />
    );

    expect(screen.getByText("이동범")).toBeInTheDocument();
    expect(screen.getByText("dongbumss")).toBeInTheDocument();
  });

  it("renders user avatar", () => {
    render(
      <InstagramChatHeader
        user={mockUser}
        onBack={mockOnBack}
        onPhoneCall={mockOnPhoneCall}
        onVideoCall={mockOnVideoCall}
      />
    );

    const avatar = screen.getByAltText("이동범");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", expect.stringContaining("example.com/avatar.jpg"));
  });

  it("renders back button", () => {
    render(
      <InstagramChatHeader
        user={mockUser}
        onBack={mockOnBack}
        onPhoneCall={mockOnPhoneCall}
        onVideoCall={mockOnVideoCall}
      />
    );

    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();
    
    fireEvent.click(backButton);
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("renders phone call button", () => {
    render(
      <InstagramChatHeader
        user={mockUser}
        onBack={mockOnBack}
        onPhoneCall={mockOnPhoneCall}
        onVideoCall={mockOnVideoCall}
      />
    );

    const phoneButton = screen.getByTestId("phone-button");
    expect(phoneButton).toBeInTheDocument();
    
    fireEvent.click(phoneButton);
    expect(mockOnPhoneCall).toHaveBeenCalledTimes(1);
  });

  it("renders video call button", () => {
    render(
      <InstagramChatHeader
        user={mockUser}
        onBack={mockOnBack}
        onPhoneCall={mockOnPhoneCall}
        onVideoCall={mockOnVideoCall}
      />
    );

    const videoButton = screen.getByTestId("video-button");
    expect(videoButton).toBeInTheDocument();
    
    fireEvent.click(videoButton);
    expect(mockOnVideoCall).toHaveBeenCalledTimes(1);
  });

  it("applies Instagram header styling", () => {
    render(
      <InstagramChatHeader
        user={mockUser}
        onBack={mockOnBack}
        onPhoneCall={mockOnPhoneCall}
        onVideoCall={mockOnVideoCall}
      />
    );

    const header = screen.getByTestId("instagram-chat-header");
    expect(header).toHaveClass("bg-white");
    expect(header).toHaveClass("border-b");
  });
});