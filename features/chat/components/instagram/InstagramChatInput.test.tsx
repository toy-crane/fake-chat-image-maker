import { describe, expect, it, jest, beforeEach } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { InstagramChatInput } from "./InstagramChatInput";

describe("InstagramChatInput", () => {
  const mockOnSendMessage = jest.fn();
  const mockOnCamera = jest.fn();
  const mockOnMicrophone = jest.fn();
  const mockOnGallery = jest.fn();
  const mockOnSticker = jest.fn();
  const mockOnMore = jest.fn();

  beforeEach(() => {
    mockOnSendMessage.mockClear();
    mockOnCamera.mockClear();
    mockOnMicrophone.mockClear();
    mockOnGallery.mockClear();
    mockOnSticker.mockClear();
    mockOnMore.mockClear();
  });

  it("renders input field with placeholder", () => {
    render(
      <InstagramChatInput
        onSendMessage={mockOnSendMessage}
        onCamera={mockOnCamera}
        onMicrophone={mockOnMicrophone}
        onGallery={mockOnGallery}
        onSticker={mockOnSticker}
        onMore={mockOnMore}
      />
    );

    const input = screen.getByPlaceholderText("Message...");
    expect(input).toBeInTheDocument();
  });

  it("renders camera button", () => {
    render(
      <InstagramChatInput
        onSendMessage={mockOnSendMessage}
        onCamera={mockOnCamera}
        onMicrophone={mockOnMicrophone}
        onGallery={mockOnGallery}
        onSticker={mockOnSticker}
        onMore={mockOnMore}
      />
    );

    const cameraButton = screen.getByTestId("camera-button");
    expect(cameraButton).toBeInTheDocument();
    
    fireEvent.click(cameraButton);
    expect(mockOnCamera).toHaveBeenCalledTimes(1);
  });

  it("renders microphone button", () => {
    render(
      <InstagramChatInput
        onSendMessage={mockOnSendMessage}
        onCamera={mockOnCamera}
        onMicrophone={mockOnMicrophone}
        onGallery={mockOnGallery}
        onSticker={mockOnSticker}
        onMore={mockOnMore}
      />
    );

    const micButton = screen.getByTestId("microphone-button");
    expect(micButton).toBeInTheDocument();
    
    fireEvent.click(micButton);
    expect(mockOnMicrophone).toHaveBeenCalledTimes(1);
  });

  it("renders gallery button", () => {
    render(
      <InstagramChatInput
        onSendMessage={mockOnSendMessage}
        onCamera={mockOnCamera}
        onMicrophone={mockOnMicrophone}
        onGallery={mockOnGallery}
        onSticker={mockOnSticker}
        onMore={mockOnMore}
      />
    );

    const galleryButton = screen.getByTestId("gallery-button");
    expect(galleryButton).toBeInTheDocument();
    
    fireEvent.click(galleryButton);
    expect(mockOnGallery).toHaveBeenCalledTimes(1);
  });

  it("renders sticker button", () => {
    render(
      <InstagramChatInput
        onSendMessage={mockOnSendMessage}
        onCamera={mockOnCamera}
        onMicrophone={mockOnMicrophone}
        onGallery={mockOnGallery}
        onSticker={mockOnSticker}
        onMore={mockOnMore}
      />
    );

    const stickerButton = screen.getByTestId("sticker-button");
    expect(stickerButton).toBeInTheDocument();
    
    fireEvent.click(stickerButton);
    expect(mockOnSticker).toHaveBeenCalledTimes(1);
  });

  it("renders more button", () => {
    render(
      <InstagramChatInput
        onSendMessage={mockOnSendMessage}
        onCamera={mockOnCamera}
        onMicrophone={mockOnMicrophone}
        onGallery={mockOnGallery}
        onSticker={mockOnSticker}
        onMore={mockOnMore}
      />
    );

    const moreButton = screen.getByTestId("more-button");
    expect(moreButton).toBeInTheDocument();
    
    fireEvent.click(moreButton);
    expect(mockOnMore).toHaveBeenCalledTimes(1);
  });

  it("sends message on Enter key", () => {
    render(
      <InstagramChatInput
        onSendMessage={mockOnSendMessage}
        onCamera={mockOnCamera}
        onMicrophone={mockOnMicrophone}
        onGallery={mockOnGallery}
        onSticker={mockOnSticker}
        onMore={mockOnMore}
      />
    );

    const input = screen.getByPlaceholderText("Message...");
    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    
    expect(mockOnSendMessage).toHaveBeenCalledWith("Test message");
  });

  it("applies Instagram input styling", () => {
    render(
      <InstagramChatInput
        onSendMessage={mockOnSendMessage}
        onCamera={mockOnCamera}
        onMicrophone={mockOnMicrophone}
        onGallery={mockOnGallery}
        onSticker={mockOnSticker}
        onMore={mockOnMore}
      />
    );

    const container = screen.getByTestId("instagram-chat-input");
    expect(container).toHaveClass("bg-white");
    expect(container).toHaveClass("border-t");
  });
});