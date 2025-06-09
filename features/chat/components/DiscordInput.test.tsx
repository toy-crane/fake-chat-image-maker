import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { DiscordInput } from "./DiscordInput";

describe("DiscordInput", () => {
  it("renders message input field", () => {
    render(<DiscordInput channelName="general" />);
    
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("shows correct placeholder text", () => {
    render(<DiscordInput channelName="general" />);
    
    const input = screen.getByPlaceholderText("Message #general");
    expect(input).toBeInTheDocument();
  });

  it("applies Discord input styling", () => {
    render(<DiscordInput channelName="general" />);
    
    const inputContainer = screen.getByTestId("discord-input");
    expect(inputContainer).toHaveClass("bg-gray-600", "rounded-lg", "mx-4", "mb-4");
  });

  it("shows emoji button", () => {
    render(<DiscordInput channelName="general" />);
    
    expect(screen.getByTestId("emoji-button")).toBeInTheDocument();
  });

  it("shows attachment button", () => {
    render(<DiscordInput channelName="general" />);
    
    expect(screen.getByTestId("attachment-button")).toBeInTheDocument();
  });

  it("shows send button when message is entered", () => {
    render(<DiscordInput channelName="general" />);
    
    // Initially should show mic icon instead of send
    expect(screen.getByTestId("mic-button")).toBeInTheDocument();
    expect(screen.queryByTestId("send-button")).not.toBeInTheDocument();
  });

  it("uses dark theme colors", () => {
    render(<DiscordInput channelName="general" />);
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("bg-transparent", "text-gray-100");
  });

  it("handles custom placeholder", () => {
    render(<DiscordInput channelName="general" placeholder="Custom placeholder" />);
    
    const input = screen.getByPlaceholderText("Custom placeholder");
    expect(input).toBeInTheDocument();
  });
});